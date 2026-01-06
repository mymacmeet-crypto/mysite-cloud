package com.mysite.core.utils;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

public class LinkUtils {
	private LinkUtils() {
        // Utility class
    }

    /**
     * Formats a link using ResourceResolver
     */
    public static String getFormattedLink(final String url, final ResourceResolver resolver) {
        if (StringUtils.isBlank(url)) {
            return StringUtils.EMPTY;
        }

        if (isExternalLink(url) || resolver == null) {
            return url;
        }

        Page page = getInternalPage(url, resolver);
        if (page == null) {
            return url;
        }

        String mapped = resolver.map(url);
        return appendHtmlIfRequired(mapped);
    }

    /**
     * Formats a link using Sling request
     */
    public static String getFormattedLink(final String url, final SlingHttpServletRequest request) {
        if (StringUtils.isBlank(url)) {
            return StringUtils.EMPTY;
        }

        if (isExternalLink(url) || request == null) {
            return url;
        }

        ResourceResolver resolver = request.getResourceResolver();
        Page page = getInternalPage(url, resolver);
        if (page == null) {
            return url;
        }

        String mapped = resolver.map(request, url);
        return appendHtmlIfRequired(mapped);
    }

    /**
     * External link check
     */
    public static boolean isExternalLink(final String link) {
        if (StringUtils.isBlank(link)) {
            return false;
        }
        return link.startsWith("http")
                || link.startsWith("https")
                || link.startsWith("mailto:")
                || link.startsWith("tel:")
                || link.startsWith("#")
                || link.startsWith("//");
    }

    /**
     * Returns internal AEM page if exists
     */
    public static Page getInternalPage(final String url, final ResourceResolver resolver) {
        if (StringUtils.isBlank(url) || resolver == null) {
            return null;
        }

        PageManager pageManager = resolver.adaptTo(PageManager.class);
        return pageManager != null ? pageManager.getPage(url) : null;
    }

    /**
     * Append .html only when required
     */
    private static String appendHtmlIfRequired(final String link) {
        if (StringUtils.isBlank(link)
                || link.endsWith(".html")
                || link.equals("/")
                || link.contains(".")) {
            return link;
        }
        return link + ".html";
    }

}
