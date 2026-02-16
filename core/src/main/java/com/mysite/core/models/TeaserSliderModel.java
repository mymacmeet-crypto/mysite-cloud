package com.mysite.core.models;

import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.mysite.core.pojo.CustomCard;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TeaserSliderModel {

	@ChildResource(name = "customCardItem")
	List<CustomCard> customCardList;

	@ValueMapValue
	private int delay;

	@ValueMapValue
	private boolean autoplay;

	public List<CustomCard> getCustomCardList() {
		return customCardList;
	}

	public int getDelay() {
		return delay;
	}

	public boolean isAutoplay() {
		return autoplay;
	}

}
