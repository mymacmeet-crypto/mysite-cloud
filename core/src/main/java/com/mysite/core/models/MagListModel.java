package com.mysite.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagListModel {

    @ValueMapValue
    private String fileReference;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String text;

    @ValueMapValue
    private String category;

    @ValueMapValue
    private String date;

    @ValueMapValue
    private int comments;

    @ValueMapValue
    private int views;

    @ValueMapValue
    private String link;

    // Getters

    public String getFileReference() {
        return fileReference;
    }

    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }

    public String getCategory() {
        return category;
    }

    public String getDate() {
        return date;
    }

    public int getComments() {
        return comments;
    }

    public int getViews() {
        return views;
    }

    public String getLink() {
        return link;
    }

    public boolean isEmpty() {
        return title == null || title.isEmpty();
    }
}