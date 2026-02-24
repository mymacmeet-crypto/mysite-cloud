package com.mysite.core.pojo;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class GalleryImage {

    @ValueMapValue
    private String image;

    @ValueMapValue
    private String alt;

    @ValueMapValue
    private String link;

    // Getters

    public String getImage() {
        return image;
    }

    public String getAlt() {
        return alt;
    }

    public String getLink() {
        return link;
    }
}