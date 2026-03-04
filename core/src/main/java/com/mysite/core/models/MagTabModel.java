package com.mysite.core.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.gson.Gson;
import com.mysite.core.pojo.MagCard;
import com.mysite.core.pojo.TabItem;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagTabModel {

    // ══════════════════════════════════════════════════════════════════════════
    //  INJECTED FIELDS
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Selects the content source strategy authored in the dialog:
     *   "static"     – title and cards come from the locally authored multifield.
     *   "parentPath" – title is fetched from the target page's jcr:title;
     *                  cards are fetched from the first MagView component found
     *                  on that page.
     */
    @ValueMapValue
    private String version;

    /** Authored title; used when version = "static". */
    @ValueMapValue
    private String title;

    /**
     * Target page path; used when version = "parentPath".
     * Title and cards are resolved from this page at runtime.
     */
    @ValueMapValue
    private String parentPath;

    /**
     * Locally authored card child nodes; used when version = "static".
     * Each node is adapted to MagCard (fileReference, title, text, category,
     * cq:tags, date, comments, views, link).
     */
    @ChildResource(name = "card")
    private List<MagCard> localCards;

    @SlingObject
    private ResourceResolver resourceResolver;

    // ══════════════════════════════════════════════════════════════════════════
    //  COMPUTED FIELDS
    // ══════════════════════════════════════════════════════════════════════════

    /** Final resolved card list (local or from parentPath). */
    private List<MagCard> cards;

    /**
     * Auto-generated tab list derived from the unique category values across
     * all resolved cards. Always starts with an "ALL" tab.
     * No manual tab authoring is required in the dialog.
     */
    private List<TabItem> tabs;

    /** JSON-serialised card list for client-side JavaScript consumption. */
    private String cardsJson;

    /** Unique UUID per render — used to scope localStorage keys client-side. */
    private String componentId;

    /** True when cards were resolved from parentPath rather than local authoring. */
    private boolean usingParentPath;

    // ══════════════════════════════════════════════════════════════════════════
    //  POST CONSTRUCT
    // ══════════════════════════════════════════════════════════════════════════

    @PostConstruct
    protected void init() {
        componentId = UUID.randomUUID().toString();

        boolean isParentPathMode = "parentPath".equals(version)
                && parentPath != null
                && !parentPath.trim().isEmpty();

        if (isParentPathMode) {
            resolveFromParentPath();
        } else {
            // Static mode — use locally authored card child nodes
            cards           = localCards != null ? localCards : Collections.emptyList();
            usingParentPath = false;
        }

        // Auto-generate tabs from resolved card categories — no manual authoring needed
        tabs = buildTabsFromCards(cards);

        // Serialise via a plain DTO map to avoid Gson recursing into Sling internals
        // (MagCard holds a ResourceResolver field which would cause StackOverflowError)
        cardsJson = cards.isEmpty() ? "[]" : serializeCards();
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  PRIVATE HELPERS
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Populates {@link #title} and {@link #cards} from the page at
     * {@link #parentPath}:
     * <ol>
     *   <li>title  ← {@code parentPage.getTitle()} (jcr:title)</li>
     *   <li>cards  ← items from the first {@link MagViewModel} with content
     *                found anywhere on the page's resource tree</li>
     * </ol>
     * Falls back to locally authored cards if resolution fails at any step.
     */
    private void resolveFromParentPath() {
        try {
            PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
            if (pageManager == null) {
                fallbackToLocal();
                return;
            }

            Page parentPage = pageManager.getPage(parentPath.trim());
            if (parentPage == null) {
                fallbackToLocal();
                return;
            }

            // Title from page jcr:title
            title = parentPage.getTitle();

            // Cards from the first MagView component found on the page tree
            Resource contentResource = parentPage.getContentResource();
            if (contentResource != null) {
                List<MagCard> remoteCards = findMagViewCards(contentResource);
                if (remoteCards != null && !remoteCards.isEmpty()) {
                    cards           = remoteCards;
                    usingParentPath = true;
                    return;
                }
            }
        } catch (Exception e) {
            // Log in production; fall through to local fallback
        }

        fallbackToLocal();
    }

    /** Sets cards to local authored cards and flags parentPath as NOT used. */
    private void fallbackToLocal() {
        cards           = localCards != null ? localCards : Collections.emptyList();
        usingParentPath = false;
    }

    /**
     * Depth-first search for a {@link MagViewModel} with at least one item.
     * Returns its items, or an empty list if none is found.
     *
     * @param resource root of the search
     * @return non-null list; empty when no MagView with items is found
     */
    private List<MagCard> findMagViewCards(Resource resource) {
        MagViewModel model = resource.adaptTo(MagViewModel.class);
        if (model != null && model.hasItems()) {
            return model.getItems();
        }

        for (Resource child : resource.getChildren()) {
            List<MagCard> result = findMagViewCards(child);
            if (!result.isEmpty()) {
                return result;
            }
        }

        return Collections.emptyList();
    }

    /**
     * Builds the tab list automatically from the unique non-blank category
     * values present in {@code cardList}, preserving insertion order.
     * Tab 0 is always {@code label="ALL", category="all"}.
     *
     * @param cardList resolved cards (may be empty)
     * @return ordered list of {@link TabItem}; never null
     */
    private List<TabItem> buildTabsFromCards(List<MagCard> cardList) {
        List<TabItem> tabList = new ArrayList<>();
        tabList.add(new TabItem("ALL", "all")); // always first

        if (cardList == null || cardList.isEmpty()) {
            return tabList;
        }

        // LinkedHashSet preserves insertion order and de-duplicates
        Set<String> seen = new LinkedHashSet<>();
        for (MagCard card : cardList) {
            String cat = card.getCategory();
            if (cat != null && !cat.trim().isEmpty()) {
                seen.add(cat.trim());
            }
        }

        for (String cat : seen) {
            tabList.add(new TabItem(cat, cat));
        }

        return tabList;
    }

    /**
     * Serialises {@link #cards} to a JSON array using plain DTO maps rather
     * than the MagCard model directly.
     *
     * This avoids a {@code StackOverflowError} that Gson would throw when
     * recursing into the {@code ResourceResolver} field that Sling injects
     * into every {@link MagCard} instance.
     *
     * @return JSON string representation of the card list
     */
    private String serializeCards() {
        List<Map<String, Object>> dtos = new ArrayList<>();

        for (MagCard card : cards) {
            Map<String, Object> dto = new LinkedHashMap<>();
            dto.put("fileReference", card.getFileReference());
            dto.put("title",         card.getTitle());
            dto.put("text",          card.getText());
            dto.put("category",      card.getCategory());
            dto.put("comments",      card.getComments());
            dto.put("views",         card.getViews());
            dto.put("link",          card.getLink());
            dtos.add(dto);
        }

        return new Gson().toJson(dtos);
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  GETTERS
    // ══════════════════════════════════════════════════════════════════════════

    /** Component section title (authored or resolved from page jcr:title). */
    public String getTitle() {
        return title;
    }

    /** The authored version value — {@code "static"} or {@code "parentPath"}. */
    public String getVersion() {
        return version;
    }

    /**
     * The authored parent path (null/blank when version is {@code "static"}).
     * Exposed to HTL for the author-mode notice.
     */
    public String getParentPath() {
        return parentPath;
    }

    /**
     * Auto-generated tab list derived from resolved card categories.
     * Always starts with an "ALL" tab.
     */
    public List<TabItem> getTabs() {
        return tabs != null ? tabs : Collections.emptyList();
    }

    /** Resolved card list — from local authoring or parentPath page. */
    public List<MagCard> getCards() {
        return cards != null ? cards : Collections.emptyList();
    }

    /** JSON-serialised card list for client-side JavaScript consumption. */
    public String getCardsJson() {
        return cardsJson;
    }

    /** Unique UUID per render, used to scope {@code localStorage} keys. */
    public String getComponentId() {
        return componentId;
    }

    /**
     * {@code true} when the current card set was sourced from
     * {@link #parentPath} rather than local authoring.
     */
    public boolean isUsingParentPath() {
        return usingParentPath;
    }

    public boolean isEmpty() {
        return cards == null || cards.isEmpty();
    }

    public boolean hasCards() {
        return cards != null && !cards.isEmpty();
    }
}