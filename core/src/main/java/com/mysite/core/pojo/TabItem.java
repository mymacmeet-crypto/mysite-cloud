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

    // Required by Sling Models for resource-based adaptation
    public TabItem() {}

    // Used by MagTabModel to build tabs programmatically from card categories
    public TabItem(String label, String category) {
        this.label    = label;
        this.category = category;
    }

    public String getLabel()    { return label; }
    public String getCategory() { return category; }
}