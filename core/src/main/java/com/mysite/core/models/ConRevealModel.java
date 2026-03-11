package com.mysite.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import com.mysite.core.pojo.RevealSlide;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ConRevealModel {

    @ChildResource(name = "slide")
    private List<RevealSlide> slides;

    // Getters

    public List<RevealSlide> getSlides() {
        return slides != null ? slides : Collections.emptyList();
    }

    public boolean isEmpty() {
        return slides == null || slides.isEmpty();
    }

    public boolean hasSlides() {
        return slides != null && !slides.isEmpty();
    }
}