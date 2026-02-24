package com.mysite.core.listeners;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.observation.ResourceChange;
import org.apache.sling.api.resource.observation.ResourceChangeListener;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

@Component(service = ResourceChangeListener.class, property = {

		ResourceChangeListener.PATHS + "=/content/mysite",

		ResourceChangeListener.CHANGES + "=CHANGED"

})
public class PagePropertiesListener implements ResourceChangeListener {

	@Reference
	private ResourceResolverFactory resolverFactory;

// prevent duplicate triggers
	private static final Map<String, Long> LOCK = new HashMap<>();

	@Override
	public void onChange(List<ResourceChange> changes) {
		Map<String, Object> param = Map.of(ResourceResolverFactory.SUBSERVICE, "myproject-service");

		try (ResourceResolver resolver = resolverFactory.getServiceResourceResolver(param)) {

			PageManager pm = resolver.adaptTo(PageManager.class);

			for (ResourceChange change : changes) {

				String path = change.getPath();

				if (!path.endsWith("jcr:content")) {
					continue;
				}

				Resource resource = resolver.getResource(path);

				if (resource == null) {
					continue;
				}

				long now = System.currentTimeMillis();

				if (LOCK.containsKey(path) && now - LOCK.get(path) < 5000) {

					continue;
				}

				LOCK.put(path, now);

				Page page = pm.getContainingPage(resource);

				if (page == null) {
					continue;
				}

				Calendar offTime = resource.getValueMap().get("offTime", Calendar.class);

				if (offTime == null) {
					continue;
				}

				long expiryMillis = offTime.getTimeInMillis();

				long currentMillis = System.currentTimeMillis();

				long diffMillis = expiryMillis - currentMillis;

				String message = "";
				if (diffMillis <= 0) {

					message = "Page already expired";

				} else {

					long hours = diffMillis / (1000 * 60 * 60);

					message = "Page is going to expire in : " + hours + " hours";

				}

				pm.createRevision(

						page,

						"",

						message
				);

			}

		} catch (Exception e) {

			e.printStackTrace();

		}

	}

}
