package com.mysite.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.mysite.core.pojo.NavItem;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagHeaderModel {

    // ── Branding ──────────────────────────────────────────────────────────────

    @ValueMapValue
    private String logoUrl;

    @ValueMapValue
    private String logoLink;

    @ValueMapValue
    private String logoAlt;

    // ── Top Bar - Social Links ───────────────────────────────────────────────

    @ValueMapValue
    private String twitterUrl;

    @ValueMapValue
    private String facebookUrl;

    @ValueMapValue
    private String youtubeUrl;

    @ValueMapValue
    private String subscribeUrl;

    // ── Top Bar - Weather & Accessibility ─────────────────────────────────────

    @ValueMapValue
    private String weatherText;

    @ValueMapValue
    private String aaButtonUrl;

    // ── Navigation ────────────────────────────────────────────────────────────

    @ChildResource(name = "navItem")
    private List<NavItem> navItems;

    // ══════════════════════════════════════════════════════════════════════════
    //  GETTERS
    // ══════════════════════════════════════════════════════════════════════════

    public String getLogoUrl() {
        return logoUrl;
    }

    public String getLogoLink() {
        return logoLink != null ? logoLink : "/";
    }

    public String getLogoAlt() {
        return logoAlt != null ? logoAlt : "Site Logo";
    }

    public String getTwitterUrl() {
        return twitterUrl;
    }

    public String getFacebookUrl() {
        return facebookUrl;
    }

    public String getYoutubeUrl() {
        return youtubeUrl;
    }

    public String getSubscribeUrl() {
        return subscribeUrl;
    }

    public String getWeatherText() {
        return weatherText;
    }

    public String getAaButtonUrl() {
        return aaButtonUrl;
    }

    public List<NavItem> getNavItems() {
        return navItems != null ? navItems : Collections.emptyList();
    }

    public boolean isEmpty() {
        return logoUrl == null || logoUrl.isEmpty();
    }

    public boolean hasNavItems() {
        return navItems != null && !navItems.isEmpty();
    }
}