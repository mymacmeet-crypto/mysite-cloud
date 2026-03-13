package com.mysite.core.pojo;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SidebarMenuItem {

    @ValueMapValue
    private String label;

    @ValueMapValue
    private String url;

    @ValueMapValue
    private Boolean active;

    public String getLabel() {
        return label;
    }

    public String getUrl() {
        return url;
    }

    public boolean isActive() {
        return active != null && active;
    }
}
