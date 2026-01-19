package com.mysite.core.models;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BookListModel {

    @SlingObject
    private ResourceResolver resourceResolver;
    
    @ValueMapValue
    private String nodePath;

    private List<Book> books = new ArrayList<>();

    @PostConstruct
    protected void init() {
    	if(null == nodePath) {
    		return;
    	}
    	
        Resource booksRoot = resourceResolver.getResource(nodePath);
        if (booksRoot != null) {
            for (Resource bookRes : booksRoot.getChildren()) {
                ValueMap vm = bookRes.getValueMap();
                Book b = new Book();
                b.setTitle(vm.get("title", ""));
                b.setPrice(vm.get("price", 0.0));
                b.setCategory(vm.get("category", ""));
                books.add(b);
            }
        }
    }

    public List<Book> getBooks() {
        return books;
    }
    
    public String getNodePath() {
    	return nodePath;
    }

    // Inner POJO
    public static class Book {
        private String title;
        private double price;
        private String category;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
    }
}