package com.mysite.core.pojo;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.mysite.core.utils.LinkUtils;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NavItem {

    @ValueMapValue
    private String label;

    @ValueMapValue
    private String link;

    @ChildResource(name = "submenuItem")
    private List<SubMenuItem> submenu;
    
    @SlingObject
    private ResourceResolver resourceResolver;

    // Getters

    public String getLabel() {
        return label;
    }

    public String getLink() {
    	 return LinkUtils.getFormattedLink(link, resourceResolver);
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
    	
    	 @SlingObject
    	  private ResourceResolver resourceResolver;


        @ValueMapValue
        private String label;

        @ValueMapValue
        private String link;

        // Getters

        public String getLabel() {
            return label;
        }

        public String getLink() {
            return LinkUtils.getFormattedLink(link, resourceResolver);
        }
    }
}