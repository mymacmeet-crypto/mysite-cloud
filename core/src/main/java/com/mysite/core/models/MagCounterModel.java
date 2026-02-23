package com.mysite.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.mysite.core.pojo.CounterItem;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagCounterModel {

    @ValueMapValue
    private String backgroundImage;

    @ChildResource(name = "counterItem")
    private List<CounterItem> items;

    // Getters

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public List<CounterItem> getItems() {
        return items != null ? items : Collections.emptyList();
    }

    public boolean isEmpty() {
        return items == null || items.isEmpty();
    }

    public boolean hasItems() {
        return items != null && !items.isEmpty();
    }

    public String getBackgroundStyle() {
    if (backgroundImage != null && !backgroundImage.isEmpty()) {
        return "background-image: url('" + backgroundImage + "');";
    }
    return "";
}
}