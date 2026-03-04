package com.mysite.core.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
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
     * Selects the content source strategy (authored in dialog Tab 1):
     *   "static"     – title + cards come from the local multifield.
     *   "parentPath" – title taken from the target page's jcr:title;
     *                  cards taken from the first MagView component on that page.
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
     * Each node adapts to MagCard (fileReference, title, text, category,
     * cq:tags, date, comments, views, link).
     */
    @ChildResource(name = "card")
    private List<MagCard> localCards;

    @SlingObject
    private ResourceResolver resourceResolver;

    // ══════════════════════════════════════════════════════════════════════════
    //  COMPUTED FIELDS
    // ══════════════════════════════════════════════════════════════════════════

    private List<MagCard> cards;

    /**
     * Auto-generated tabs derived from the unique category values across all
     * resolved cards. Always starts with an "ALL" tab.
     * No manual tab authoring required — the dialog no longer has a tab multifield.
     */
    private List<TabItem> tabs;

    private String cardsJson;
    private String componentId;
    private boolean usingParentPath;

    // ══════════════════════════════════════════════════════════════════════════
    //  POST CONSTRUCT
    // ══════════════════════════════════════════════════════════════════════════

    @PostConstruct
    protected void init() {
        componentId = UUID.randomUUID().toString();

        boolean isParentPathMode = "parentPath".equals(version)
                && parentPath != null && !parentPath.trim().isEmpty();

        if (isParentPathMode) {
            resolveFromParentPath();
        } else {
            cards           = localCards != null ? localCards : Collections.emptyList();
            usingParentPath = false;
        }

        // Build tabs automatically — no manual authoring needed
        tabs = buildTabsFromCards(cards);

        Gson gson = new Gson();
        cardsJson = cards.isEmpty() ? "[]" : gson.toJson(cards);
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  PRIVATE HELPERS
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Populates title + cards from the page at parentPath:
     *   1. title  ← parentPage.getTitle()
     *   2. cards  ← first MagViewModel with items found on that page (recursive)
     * Falls back to local cards if resolution fails.
     */
    private void resolveFromParentPath() {
        try {
            PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
            if (pageManager == null) { fallbackToLocal(); return; }

            Page parentPage = pageManager.getPage(parentPath.trim());
            if (parentPage == null) { fallbackToLocal(); return; }

            // Title from page jcr:title
            title = parentPage.getTitle();

            // Cards from the first MagView component found on the page
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
            // Fall through to local fallback
        }
        fallbackToLocal();
    }

    private void fallbackToLocal() {
        cards           = localCards != null ? localCards : Collections.emptyList();
        usingParentPath = false;
    }

    /**
     * Depth-first search for a MagViewModel with at least one item.
     * Returns its items, or an empty list if none is found.
     */
    private List<MagCard> findMagViewCards(Resource resource) {
        MagViewModel model = resource.adaptTo(MagViewModel.class);
        if (model != null && model.hasItems()) {
            return model.getItems();
        }
        for (Resource child : resource.getChildren()) {
            List<MagCard> result = findMagViewCards(child);
            if (!result.isEmpty()) return result;
        }
        return Collections.emptyList();
    }

    /**
     * Builds tabs from unique card categories in insertion order.
     * Tab 0 is always { label:"ALL", category:"all" }.
     */
    private List<TabItem> buildTabsFromCards(List<MagCard> cardList) {
        List<TabItem> tabList = new ArrayList<>();
        tabList.add(new TabItem("ALL", "all")); // always first

        if (cardList == null || cardList.isEmpty()) return tabList;

        Set<String> seen = new LinkedHashSet<>();
        for (MagCard card : cardList) {
            String cat = card.getCategory();
            if (cat != null && !cat.trim().isEmpty()) seen.add(cat.trim());
        }
        for (String cat : seen) {
            tabList.add(new TabItem(cat, cat));
        }
        return tabList;
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  GETTERS
    // ══════════════════════════════════════════════════════════════════════════

    public String getTitle()           { return title; }
    public String getVersion()         { return version; }
    public String getParentPath()      { return parentPath; }
    public String getCardsJson()       { return cardsJson; }
    public String getComponentId()     { return componentId; }
    public boolean isUsingParentPath() { return usingParentPath; }

    /** Auto-generated tabs — always begins with "ALL". */
    public List<TabItem> getTabs() {
        return tabs != null ? tabs : Collections.emptyList();
    }

    /** Resolved cards (local or from parentPath). */
    public List<MagCard> getCards() {
        return cards != null ? cards : Collections.emptyList();
    }

    public boolean isEmpty()  { return cards == null || cards.isEmpty(); }
    public boolean hasCards() { return cards != null && !cards.isEmpty(); }
}