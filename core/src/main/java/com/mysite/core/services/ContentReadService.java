package com.mysite.core.services;

import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.mysite.core.utils.AEMContextUtil;

@Component(service = ContentReadService.class)
public class ContentReadService {
	
	@Reference
	private AemServiceResolverProvider resolverProvider;

	public Page getPage(String path) {
		try (ResourceResolver resolver = resolverProvider.getServiceResolver()) {
			PageManager pm = AEMContextUtil.getPageManager(resolver);
			return pm != null ? pm.getPage(path) : null;
		}
	}
}
