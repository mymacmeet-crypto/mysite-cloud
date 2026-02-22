package com.mysite.core.pojo;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CounterItem {

    @ValueMapValue
    private String icon;

    @ValueMapValue
    private int number;

    @ValueMapValue
    private String suffix;

    @ValueMapValue
    private String label;

    // Getters

    public String getIcon() {
        return icon;
    }

    public int getNumber() {
        return number;
    }

    public String getSuffix() {
        return suffix != null ? suffix : "";
    }

    public String getLabel() {
        return label;
    }
}