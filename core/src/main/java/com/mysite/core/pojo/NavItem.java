package com.mysite.core.pojo;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NavItem {

    @ValueMapValue
    private String label;

    @ValueMapValue
    private String link;

    @ChildResource(name = "submenuItem")
    private List<SubMenuItem> submenu;

    // Getters

    public String getLabel() {
        return label;
    }

    public String getLink() {
        return link;
    }

    public List<SubMenuItem> getSubmenu() {
        return submenu != null ? submenu : Collections.emptyList();
    }

    public boolean hasSubmenu() {
        return submenu != null && !submenu.isEmpty();
    }

    // ─── SubMenuItem Inner Class ─────────────────────────────────────────────

    @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
    public static class SubMenuItem {

        @ValueMapValue
        private String label;

        @ValueMapValue
        private String link;

        // Getters

        public String getLabel() {
            return label;
        }

        public String getLink() {
            return link;
        }
    }
}