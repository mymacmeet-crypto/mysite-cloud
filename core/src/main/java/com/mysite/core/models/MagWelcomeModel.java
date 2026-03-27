package com.mysite.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagWelcomeModel {

    // ── Content ──────────────────────────────────────────────────────────────

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String subtitle;

    @ValueMapValue
    private String description;

    // ── Media ────────────────────────────────────────────────────────────────

    @ValueMapValue
    private String backgroundImage;

    // ── CTA ──────────────────────────────────────────────────────────────────

    @ValueMapValue
    private String ctaLabel;

    @ValueMapValue
    private String ctaLink;

    // ══════════════════════════════════════════════════════════════════════════
    //  GETTERS
    // ══════════════════════════════════════════════════════════════════════════

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public String getDescription() {
        return description;
    }

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public String getCtaLabel() {
        return ctaLabel;
    }

    public String getCtaLink() {
        return ctaLink != null ? ctaLink : "#";
    }

    public boolean isEmpty() {
        return title == null || title.isEmpty();
    }
}
