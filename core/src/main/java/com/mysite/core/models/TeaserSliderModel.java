package com.mysite.core.models;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.mysite.core.pojo.CustomCard;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TeaserSliderModel {

	@ChildResource(name = "customCardItem")
	List<CustomCard> customCardList;

	@Self
	private Resource resource;

	@ValueMapValue
	private int delay;

	@ValueMapValue
	private boolean autoplay;

	@ValueMapValue
	private String parentPagePath;
	
	@ValueMapValue
	private String sliderType;

	private List<CustomCard> teaserItems = new ArrayList<>();

	public List<CustomCard> getCustomCardList() {
		return customCardList;
	}

	public int getDelay() {
		return delay;
	}

	public boolean isAutoplay() {
		return autoplay;
	}

	@PostConstruct
	protected void init() {

		if (parentPagePath == null) {
			return;
		}

		ResourceResolver resolver = resource.getResourceResolver();
		PageManager pageManager = resolver.adaptTo(PageManager.class);

		if (pageManager != null) {

			Page parentPage = pageManager.getPage(parentPagePath);

			if (parentPage != null) {

				Iterator<Page> children = parentPage.listChildren();

				while (children.hasNext()) {

					Page childPage = children.next();

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
	}

	public List<CustomCard> getTeaserItems() {
		return teaserItems;
	}

	public boolean isEmpty() {
		return teaserItems.isEmpty();
	}

	public String getSliderType() {
		return sliderType;
	}

}
