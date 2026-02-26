package com.mysite.core.pojo;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TabItem {

    @ValueMapValue
    private String label;

    @ValueMapValue
    private String category;

    // Getters

    public String getLabel() {
        return label;
    }

    public String getCategory() {
        return category;
    }
}