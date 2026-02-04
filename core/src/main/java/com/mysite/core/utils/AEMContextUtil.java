package com.mysite.core.utils;

import javax.jcr.Session;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.caconfig.ConfigurationBuilder;

import com.adobe.cq.wcm.core.components.models.Page;
import com.day.cq.search.QueryBuilder;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.PageManager;

public final class AEMContextUtil {

	private AEMContextUtil() {

	}

	public static ResourceResolver getResourceResolver(SlingHttpServletRequest request) {
		return request != null ? request.getResourceResolver() : null;
	}

	public static ResourceResolver getResourceResolver(Resource resource) {
		return resource != null ? resource.getResourceResolver() : null;
	}

	/* ---------------- Session ---------------- */

	public static Session getSession(ResourceResolver resolver) {
		return resolver != null ? resolver.adaptTo(Session.class) : null;
	}

	/* ---------------- Page / PageManager ---------------- */

	public static PageManager getPageManager(ResourceResolver resolver) {
		return resolver != null ? resolver.adaptTo(PageManager.class) : null;
	}

	public static Page getContainingPage(Resource resource) {
		return resource != null ? resource.adaptTo(Page.class) : null;
	}

	/* ---------------- QueryBuilder ---------------- */

	public static QueryBuilder getQueryBuilder(ResourceResolver resolver) {
		return resolver != null ? resolver.adaptTo(QueryBuilder.class) : null;
	}

	/* ---------------- TagManager ---------------- */

	public static TagManager getTagManager(ResourceResolver resolver) {
		return resolver != null ? resolver.adaptTo(TagManager.class) : null;
	}

	public static <T> T getConfig(Resource resource, Class<T> clazz) {
		ConfigurationBuilder builder = resource.adaptTo(ConfigurationBuilder.class);
		return builder != null ? builder.as(clazz) : null;
	}
}
