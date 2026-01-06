package com.mysite.core.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.jcr.Session;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.osgi.service.component.annotations.Reference;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.mysite.core.services.PageUpdateService;
import com.mysite.core.utils.AEMContextUtil;
import com.mysite.core.utils.LinkUtils;

@Model(adaptables = SlingHttpServletRequest.class, resourceType = "mysite/components/search", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SearchModel {
	@Self
	private SlingHttpServletRequest request;

	@OSGiService
	private QueryBuilder queryBuilder;

	@OSGiService
	private ResourceResolver resourceResolver;

	@ValueMapValue
	@Default(intValues = 10)
	private int resultsSize;

	@ValueMapValue
	private String searchRoot;

	@ValueMapValue
	private String searchTitle;

	public String getSearchTitle() {
		return searchTitle;
	}

	public String getSearchRoot() {
		return searchRoot;
	}

	public int getResultsSize() {
		return resultsSize;
	}
	

	
	@OSGiService
	private PageUpdateService pageUpdateService;
	
	@PostConstruct
	public void init() {
		updateTitle();
	}

	public List<String> getResults() {
		String term = request.getParameter("q");

		if (StringUtils.isBlank(term)) {
			return Collections.emptyList();
		}

		Map<String, String> predicates = new HashMap<>();
		predicates.put("type", "cq:Page");
		predicates.put("path", searchRoot);
		predicates.put("p.limit", String.valueOf(resultsSize));
		predicates.put("fulltext", term);

		Session session = request.getResourceResolver().adaptTo(Session.class);
		// 🔥 TITLE + DESCRIPTION
		// predicates.put("group.p.or", "true");

		/*
		 * predicates.put("group.1_fulltext", term);
		 * predicates.put("group.1_fulltext.relPath", "jcr:content/jcr:title");
		 * 
		 * predicates.put("group.2_fulltext", term);
		 * predicates.put("group.2_fulltext.relPath", "jcr:content/jcr:description");
		 */
		Query query = queryBuilder.createQuery(PredicateGroup.create(predicates), session);

		SearchResult result = query.getResult();
		List<String> paths = new ArrayList<>();
		for (Hit hit : result.getHits()) {
			try {
				paths.add(hit.getPath());
			} catch (Exception ignored) {
			}
		}

		return paths;
	}

	public String getPageTitle() {
		ResourceResolver resolver = AEMContextUtil.getResourceResolver(request);
		PageManager pm = AEMContextUtil.getPageManager(resolver);
		Page page = pm != null ? pm.getContainingPage(request.getResource()) : null;
		return page != null ? page.getTitle() : "";
	}

	public String getPagePath() {
		ResourceResolver resolver = AEMContextUtil.getResourceResolver(request);
		PageManager pm = AEMContextUtil.getPageManager(resolver);
		Page page = pm != null ? pm.getContainingPage(request.getResource()) : null;
		return page != null ? page.getPath() : "";
		
	//	return page != null ? LinkUtils.getFormattedLink(page.getPath(), resolver) : "";
    }
	
	public void  updateTitle() {
	   String path = getPagePath();
	   String newTitle = "New Title";
       pageUpdateService.updateTitle(path, newTitle);
	}

}
