package com.mysite.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.mysite.core.pojo.FooterLink;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagCopyrightBarModel {

    @ValueMapValue
    private String copyrightText;

    @ChildResource(name = "footerLink")
    private List<FooterLink> footerLinks;

    @ValueMapValue
    private String twitterUrl;

    @ValueMapValue
    private String facebookUrl;

    // Getters

    public String getCopyrightText() {
        return copyrightText;
    }

    public List<FooterLink> getFooterLinks() {
        return footerLinks != null ? footerLinks : Collections.emptyList();
    }

    public String getTwitterUrl() {
        return twitterUrl;
    }

    public String getFacebookUrl() {
        return facebookUrl;
    }

    public boolean isEmpty() {
        return copyrightText == null || copyrightText.isEmpty();
    }

    public boolean hasFooterLinks() {
        return footerLinks != null && !footerLinks.isEmpty();
    }
}