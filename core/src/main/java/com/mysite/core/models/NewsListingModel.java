package com.mysite.core.models;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.mysite.core.pojo.CustomCard;

@Model(adaptables = { Resource.class , SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NewsListingModel {

	
	@SlingObject
	private Resource resource;

	@ValueMapValue
	private int limit;
	
	@Self
	private SlingHttpServletRequest request;
	
	private Page renderPage;

	

	@ValueMapValue
	private String parentPagePath;
	
	private int totalPages;
	
	private int currentPage = 1;

	private List<CustomCard> teaserItems = new ArrayList<>();

	

	public int getLimit() {
		return limit;
	}

	

	@PostConstruct
	protected void init() {

		if (parentPagePath == null) {
			return;
		}

		ResourceResolver resolver = resource.getResourceResolver();
		PageManager pageManager = resolver.adaptTo(PageManager.class);
		
		PageManager pageManagerRequest = request.getResourceResolver().adaptTo(PageManager.class);
	    renderPage = pageManagerRequest.getContainingPage(request.getResource());

		if (pageManager != null) {

			Page parentPage = pageManager.getPage(parentPagePath);
			
			if (parentPage == null) {
				return;
			}
			
			String pageParam = request.getParameter("page");

		    if (pageParam != null) {
		        try {
		            currentPage = Integer.parseInt(pageParam);
		        } catch (NumberFormatException e) {
		            currentPage = 1;
		        }
		    }
			
			List<Page> allChildren = new ArrayList<>();

		    parentPage.listChildren().forEachRemaining(allChildren::add);
		    
		    int totalItems = allChildren.size();
		    
		    if(limit <= 0) {
		    	limit = 2;
		    }
		    totalPages = (int) Math.ceil((double) totalItems / limit);

		    int startIndex = (currentPage - 1) * limit;
		    int endIndex = Math.min(startIndex + limit, totalItems);
		 

				 for (int i = startIndex; i < endIndex; i++) {

					Page childPage = allChildren.get(i);

					ValueMap properties = childPage.getProperties();

					String title = properties.get("jcr:title", String.class);
					String description = properties.get("jcr:description", String.class);
					Resource contentResource = childPage.getContentResource();
					CustomCard customCard = new CustomCard();
					if (contentResource != null) {
						  Resource imageResource = contentResource.getChild("cq:featuredimage/file");
						    if (imageResource != null) {
						    	customCard.setFileReference(imageResource.getPath());
						    }
						    
					}
					customCard.setTitle(title);
					customCard.setText(description);
					
					teaserItems.add(customCard);
				}
			
		}
	}
	
	public List<Integer> getPageNumbers() {

	    List<Integer> pages = new ArrayList<>();

	    for (int i = 1; i <= totalPages; i++) {
	        pages.add(i);
	    }

	    return pages;
	}

	public List<CustomCard> getTeaserItems() {
		return teaserItems;
	}

	public boolean isEmpty() {
		return teaserItems.isEmpty();
	}
	
	public int getTotalPages() {
	    return totalPages;
	}

	public int getCurrentPage() {
	    return currentPage;
	}
	
	
	public String getCurrentPagePath() {
		return renderPage == null ? "" : renderPage.getPath();
	}

}
