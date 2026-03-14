package com.mysite.core.models;

import java.util.UUID;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagModalModel {

    @ValueMapValue
    private String buttonText;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String modalSize;

    @ValueMapValue
    private String contentPadding;

    private String modalId;

    // ══════════════════════════════════════════════════════════════════════════
    //  POST CONSTRUCT
    // ══════════════════════════════════════════════════════════════════════════

    @PostConstruct
    protected void init() {
        // Generate unique modal ID
        modalId = "modal-" + UUID.randomUUID().toString();
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  GETTERS WITH DEFAULTS
    // ══════════════════════════════════════════════════════════════════════════

    public String getButtonText() {
        return buttonText;
    }

    public String getTitle() {
        return title;
    }

    public String getModalSize() {
        return modalSize != null ? modalSize : "mag-modal-size-medium";
    }

    public String getContentPadding() {
        return contentPadding != null ? contentPadding : "mag-modal-padding-medium";
    }

    public String getModalId() {
        return modalId;
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  HELPER METHODS
    // ══════════════════════════════════════════════════════════════════════════

    public boolean hasTitle() {
        return title != null && !title.isEmpty();
    }

    public boolean hasButtonText() {
        return buttonText != null && !buttonText.isEmpty();
    }
}