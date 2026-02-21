package com.mysite.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.mysite.core.pojo.MagCard;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagViewModel {

    @ValueMapValue
    private String sectionTitle;

    @ValueMapValue
    private String viewType;

    @ChildResource(name = "item")
    private List<MagCard> items;

    // Getters

    public String getSectionTitle() {
        return sectionTitle;
    }

    public String getViewType() {
        return viewType != null ? viewType : "card";
    }

    public List<MagCard> getItems() {
        return items != null ? items : Collections.emptyList();
    }

    public boolean isEmpty() {
        return items == null || items.isEmpty();
    }

    public boolean hasItems() {
        return items != null && !items.isEmpty();
    }
}