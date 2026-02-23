package com.mysite.core.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.mysite.core.pojo.FooterLink;
import com.mysite.core.pojo.GalleryImage;
import com.mysite.core.pojo.RecentComment;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagFooterModel {

    // ── Column 1: Magazine ────────────────────────────────────────────────────

    @ValueMapValue
    private String magazineTitle;

    @ValueMapValue
    private String magazineText;

    // ── Column 2: Gallery ─────────────────────────────────────────────────────

    @ValueMapValue
    private String galleryTitle;

    @ChildResource(name = "galleryImage")
    private List<GalleryImage> galleryImages;

    // ── Column 3: Quick Links ─────────────────────────────────────────────────

    @ValueMapValue
    private String linksTitle;

    @ChildResource(name = "quickLink")
    private List<FooterLink> quickLinks;

    // ── Column 4: Recent Comments ─────────────────────────────────────────────

    @ValueMapValue
    private String commentsTitle;

    @ChildResource(name = "recentComment")
    private List<RecentComment> recentComments;

    // ── Processed Data ────────────────────────────────────────────────────────

    private List<List<FooterLink>> quickLinksColumns;

    // ══════════════════════════════════════════════════════════════════════════
    //  POST CONSTRUCT
    // ══════════════════════════════════════════════════════════════════════════

    @PostConstruct
    protected void init() {
        // Split quick links into 2 columns for balanced display
        quickLinksColumns = splitLinksIntoColumns(quickLinks);
    }

    /**
     * Splits a list of links into 2 columns for balanced display.
     *
     * @param links - List of FooterLink objects
     * @return List of 2 lists (columns)
     */
    private List<List<FooterLink>> splitLinksIntoColumns(List<FooterLink> links) {
        if (links == null || links.isEmpty()) {
            return Collections.emptyList();
        }

        int midpoint = (int) Math.ceil(links.size() / 2.0);
        
        List<List<FooterLink>> columns = new ArrayList<>();
        columns.add(new ArrayList<>(links.subList(0, midpoint)));
        
        if (midpoint < links.size()) {
            columns.add(new ArrayList<>(links.subList(midpoint, links.size())));
        } else {
            columns.add(new ArrayList<>()); // Empty second column if odd number
        }
        
        return columns;
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  GETTERS
    // ══════════════════════════════════════════════════════════════════════════

    public String getMagazineTitle() {
        return magazineTitle;
    }

    public String getMagazineText() {
        return magazineText;
    }

    public String getGalleryTitle() {
        return galleryTitle;
    }

    public List<GalleryImage> getGalleryImages() {
        return galleryImages != null ? galleryImages : Collections.emptyList();
    }

    public String getLinksTitle() {
        return linksTitle;
    }

    public List<FooterLink> getQuickLinks() {
        return quickLinks != null ? quickLinks : Collections.emptyList();
    }

    public List<List<FooterLink>> getQuickLinksColumns() {
        return quickLinksColumns != null ? quickLinksColumns : Collections.emptyList();
    }

    public String getCommentsTitle() {
        return commentsTitle;
    }

    public List<RecentComment> getRecentComments() {
        return recentComments != null ? recentComments : Collections.emptyList();
    }

    public boolean isEmpty() {
        return (magazineTitle == null || magazineTitle.isEmpty()) &&
               (galleryTitle == null || galleryTitle.isEmpty()) &&
               (linksTitle == null || linksTitle.isEmpty()) &&
               (commentsTitle == null || commentsTitle.isEmpty());
    }
}