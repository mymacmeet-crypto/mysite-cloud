package com.mysite.core.services;

import javax.jcr.Node;

import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

@Component(service = PageUpdateService.class)
public class PageUpdateService {
	
	@Reference
	private AemServiceResolverProvider resolverProvider;

	public void updateTitle(String pagePath, String title) {
		try (ResourceResolver resolver = resolverProvider.getServiceResolver()) {
			PageManager pm = resolver.adaptTo(PageManager.class);
			Page page = pm.getPage(pagePath);

			if (page != null) {
				Node contentNode = page.getContentResource().adaptTo(Node.class);
				contentNode.setProperty("jcr:title", title);
				resolver.commit();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
