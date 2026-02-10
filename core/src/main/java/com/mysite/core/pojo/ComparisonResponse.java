package com.mysite.core.pojo;

import java.util.List;


public class ComparisonResponse {
    public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<Product> getProducts() {
		return products;
	}
	public void setProducts(List<Product> products) {
		this.products = products;
	}
	public List<Specification> getSpecifications() {
		return specifications;
	}
	public void setSpecifications(List<Specification> specifications) {
		this.specifications = specifications;
	}
	private String title;
    private List<Product> products;
    private List<Specification> specifications;
}
