package com.mysite.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagContainerModel {

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String containerWidth;

    @ValueMapValue
    private String verticalPadding;

    @ValueMapValue
    private String horizontalPadding;

    @ValueMapValue
    private String backgroundColor;

    @ValueMapValue
    private Boolean topBorder;

    @ValueMapValue
    private Boolean bottomBorder;

    // ══════════════════════════════════════════════════════════════════════════
    //  GETTERS WITH DEFAULTS
    // ══════════════════════════════════════════════════════════════════════════

    public String getTitle() {
        return title;
    }

    public String getContainerWidth() {
        return containerWidth != null ? containerWidth : "mag-container-width-boxed";
    }

    public String getVerticalPadding() {
        return verticalPadding != null ? verticalPadding : "mag-container-padding-medium";
    }

    public String getHorizontalPadding() {
        return horizontalPadding != null ? horizontalPadding : "mag-container-horizontal-medium";
    }

    public String getBackgroundColor() {
        return backgroundColor != null ? backgroundColor : "white";
    }

    public Boolean getTopBorder() {
        return topBorder != null ? topBorder : false;
    }

    public Boolean getBottomBorder() {
        return bottomBorder != null ? bottomBorder : false;
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  HELPER METHODS
    // ══════════════════════════════════════════════════════════════════════════

    public boolean hasTitle() {
        return title != null && !title.isEmpty();
    }
}