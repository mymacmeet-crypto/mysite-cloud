package com.mysite.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.mysite.core.pojo.SidebarMenuItem;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SidebarModel {

    @ValueMapValue
    private String variant;

    @ValueMapValue
    private String collapsible;

    @ValueMapValue
    private Boolean defaultOpen;

    @ChildResource(name = "menuItem")
    private List<SidebarMenuItem> menuItems;

    public String getVariant() {
        return variant != null ? variant : "sidebar";
    }

    public String getCollapsible() {
        return collapsible != null ? collapsible : "offcanvas";
    }

    public boolean isDefaultOpen() {
        return defaultOpen == null || defaultOpen;
    }

    public List<SidebarMenuItem> getMenuItems() {
        return menuItems != null ? menuItems : Collections.emptyList();
    }

    public boolean hasMenuItems() {
        return menuItems != null && !menuItems.isEmpty();
    }
}
