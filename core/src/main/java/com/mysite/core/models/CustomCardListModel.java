package com.mysite.core.models;

import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import com.mysite.core.pojo.CustomCard;

@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CustomCardListModel {

	@ChildResource(name="customCardItem")
	List<CustomCard> customCardList;

	public List<CustomCard> getCustomCardList() {
		return customCardList;
	}
	
	
}
