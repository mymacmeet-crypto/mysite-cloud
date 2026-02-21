package com.mysite.core.pojo;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CustomCard {

	@ValueMapValue
	private String title;
	@ValueMapValue
	private String text;
	@ValueMapValue
	private String fileReference;
	
	@ValueMapValue(name="cq:tags")
	private String[] tags;
	
		
	@SlingObject
	private ResourceResolver resourceResolver;
	
	

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getFileReference() {
		return fileReference;
	}

	public void setFileReference(String fileReference) {
		this.fileReference = fileReference;
	}

	public String[] getTags() {
		return tags;
	}

	public void setTags(String[] tags) {
		this.tags = tags;
	}
	
	public List<String> getTagNames() {
		List<String> tagNames = new ArrayList<>();

        if (tags != null) {
     
        	TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
            for (String tagId : tags) {
                Tag tag = tagManager.resolve(tagId);
                if (tag != null) {
                    tagNames.add(tag.getTitle());   // returns Tag Name (Title)
                }
            }
        }
	        return tagNames;
	    }
	
	

	
}
