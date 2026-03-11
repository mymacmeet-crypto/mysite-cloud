package com.mysite.core.pojo;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class RevealSlide {

    @ValueMapValue
    private String beforeImage;

    @ValueMapValue
    private String afterImage;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    // Getters

    public String getBeforeImage() {
        return beforeImage;
    }

    public String getAfterImage() {
        return afterImage;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}