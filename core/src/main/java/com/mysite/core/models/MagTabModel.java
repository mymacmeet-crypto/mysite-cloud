package com.mysite.core.models;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.google.gson.Gson;
import com.mysite.core.pojo.TabCard;
import com.mysite.core.pojo.TabItem;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagTabModel {

    // ══════════════════════════════════════════════════════════════════════════
    //  INJECTED FIELDS
    // ══════════════════════════════════════════════════════════════════════════

    @ValueMapValue
    private String title;

    /**
     * Optional path to another AEM page/node whose child "card" nodes will be
     * used as the card source instead of the locally-authored cards.
     * When set, the remote cards take priority; local cards are used as a
     * fallback if the path cannot be resolved or yields no cards.
     */
    @ValueMapValue
    private String parentPath;

    @ChildResource(name = "tab")
    private List<TabItem> tabs;

    @ChildResource(name = "card")
    private List<TabCard> localCards;

    @SlingObject
    private ResourceResolver resourceResolver;

    // ══════════════════════════════════════════════════════════════════════════
    //  COMPUTED FIELDS
    // ══════════════════════════════════════════════════════════════════════════

    /** Resolved card list – either from parentPath or from local child nodes. */
    private List<TabCard> cards;

    private String cardsJson;
    private String componentId;

    /** True when cards were resolved from the parentPath (useful for HTL / debug). */
    private boolean usingParentPath;

    // ══════════════════════════════════════════════════════════════════════════
    //  POST CONSTRUCT
    // ══════════════════════════════════════════════════════════════════════════

    @PostConstruct
    protected void init() {
        // Generate unique component ID for localStorage
        componentId = UUID.randomUUID().toString();

        // Resolve cards – prefer parentPath over local cards
        cards = resolveCards();

        // Serialize cards to JSON for JavaScript consumption
        cardsJson = cards.isEmpty() ? "[]" : serializeCards();
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  PRIVATE HELPERS
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Attempts to load cards from the authored parentPath.
     * Falls back to locally-authored cards when:
     *   – parentPath is blank / null
     *   – the resource cannot be resolved
     *   – the resolved resource has no "card" child nodes
     *
     * @return non-null, possibly empty list of {@link TabCard}
     */
    private List<TabCard> resolveCards() {
        if (parentPath != null && !parentPath.trim().isEmpty()) {
            try {
                Resource parentResource = resourceResolver.getResource(parentPath.trim());

                if (parentResource != null) {
                    // Adapt the resolved resource to MagTabModel to reuse its
                    // @ChildResource(name = "card") injection automatically.
                    // Alternatively, iterate child resources named "card" directly.
                    List<TabCard> remoteCards = resolveChildCards(parentResource);

                    if (remoteCards != null && !remoteCards.isEmpty()) {
                        usingParentPath = true;
                        return remoteCards;
                    }
                }
            } catch (Exception e) {
                // Log and fall through to local cards
            }
        }

        // Fall back to local cards
        usingParentPath = false;
        return localCards != null ? localCards : Collections.emptyList();
    }

    /**
     * Iterates the direct children of {@code parentResource} whose name starts
     * with "card" and adapts each one to a {@link TabCard} Sling Model.
     *
     * @param parentResource the resolved parent resource
     * @return list of adapted TabCard models (never null)
     */
    private List<TabCard> resolveChildCards(Resource parentResource) {
        List<TabCard> result = new java.util.ArrayList<>();

        // Look for child nodes named "card" or "card0", "card1", … (multifield pattern)
        for (Resource child : parentResource.getChildren()) {
            String nodeName = child.getName();
            if (nodeName.equals("card") || nodeName.startsWith("card")) {
                TabCard card = child.adaptTo(TabCard.class);
                if (card != null) {
                    result.add(card);
                }
            }
        }

        return result;
    }

    /**
     * Serializes {@link #cards} to JSON for client-side JavaScript consumption.
     *
     * @return JSON string
     */
    private String serializeCards() {
        Gson gson = new Gson();
        return gson.toJson(cards);
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  GETTERS
    // ══════════════════════════════════════════════════════════════════════════

    public String getTitle() {
        return title;
    }

    /**
     * Returns the authored parent path (may be null/blank when not configured).
     * Exposed to HTL for use as a data attribute or conditional rendering.
     */
    public String getParentPath() {
        return parentPath;
    }

    public List<TabItem> getTabs() {
        return tabs != null ? tabs : Collections.emptyList();
    }

    /**
     * Returns the resolved card list. Source is either the parentPath node or
     * the locally-authored multifield, depending on configuration and resolution.
     */
    public List<TabCard> getCards() {
        return cards;
    }

    public String getCardsJson() {
        return cardsJson;
    }

    public String getComponentId() {
        return componentId;
    }

    /**
     * Indicates whether the current card set was sourced from the parentPath.
     * Useful for HTL conditional rendering or author-mode indicators.
     */
    public boolean isUsingParentPath() {
        return usingParentPath;
    }

    public boolean isEmpty() {
        return (tabs == null || tabs.isEmpty()) && cards.isEmpty();
    }

    public boolean hasTabs() {
        return tabs != null && !tabs.isEmpty();
    }

    public boolean hasCards() {
        return !cards.isEmpty();
    }
}