package com.mysite.core.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(
        name = "DummyJSON API Configuration",
        description = "Configuration for DummyJSON base URL and limits"
)
public @interface MysiteAPIConfig {

	@AttributeDefinition(name = "Base URL", description = "Base URL for DummyJSON API")
	String baseUrl() default "https://dummyjson.com";

	@AttributeDefinition(name = "Product Limit", description = "Number of products to fetch")
	int limit() default 5;
}
