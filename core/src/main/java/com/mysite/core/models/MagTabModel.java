package com.mysite.core.models;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.google.gson.Gson;
import com.mysite.core.pojo.TabCard;
import com.mysite.core.pojo.TabItem;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagTabModel {

    @ValueMapValue
    private String title;

    @ChildResource(name = "tab")
    private List<TabItem> tabs;

    @ChildResource(name = "card")
    private List<TabCard> cards;

    private String cardsJson;
    private String componentId;

    // ══════════════════════════════════════════════════════════════════════════
    //  POST CONSTRUCT
    // ══════════════════════════════════════════════════════════════════════════

    @PostConstruct
    protected void init() {
        // Generate unique component ID for localStorage
        componentId = UUID.randomUUID().toString();

        // Serialize cards to JSON for JavaScript
        if (cards != null && !cards.isEmpty()) {
            cardsJson = serializeCards();
        } else {
            cardsJson = "[]";
        }
    }

    /**
     * Serializes cards to JSON for JavaScript consumption.
     *
     * @return JSON string
     */
    private String serializeCards() {
        if (cards == null || cards.isEmpty()) {
            return "[]";
        }

        Gson gson = new Gson();
        return gson.toJson(cards);
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  GETTERS
    // ══════════════════════════════════════════════════════════════════════════

    public String getTitle() {
        return title;
    }

    public List<TabItem> getTabs() {
        return tabs != null ? tabs : Collections.emptyList();
    }

    public List<TabCard> getCards() {
        return cards != null ? cards : Collections.emptyList();
    }

    public String getCardsJson() {
        return cardsJson;
    }

    public String getComponentId() {
        return componentId;
    }

    public boolean isEmpty() {
        return (tabs == null || tabs.isEmpty()) && (cards == null || cards.isEmpty());
    }

    public boolean hasTabs() {
        return tabs != null && !tabs.isEmpty();
    }

    public boolean hasCards() {
        return cards != null && !cards.isEmpty();
    }
}