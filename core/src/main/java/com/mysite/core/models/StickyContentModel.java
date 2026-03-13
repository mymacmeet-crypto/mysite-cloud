package com.mysite.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class StickyContentModel {

    @ValueMapValue
    private String tabText;

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String placeholderText;

    @ValueMapValue
    private String buttonText;

    public String getTabText() {
        return tabText != null ? tabText : "SIGN UP FOR 15% OFF";
    }

    public String getHeading() {
        return heading;
    }

    public String getPlaceholderText() {
        return placeholderText != null ? placeholderText : "Email";
    }

    public String getButtonText() {
        return buttonText != null ? buttonText : "SIGN UP";
    }

    public boolean isEmpty() {
        return heading == null || heading.isEmpty();
    }
}
