package com.mysite.core.caconfig;

import org.apache.sling.caconfig.annotation.Configuration;
import org.apache.sling.caconfig.annotation.Property;

@Configuration(label = "MySite Configuration", description = "COntext aware configuration for mysite")
public @interface MySiteConfig {

	@Property(label = "API Endpoint")
	String apiEndpoint() default "";

	@Property(label = "Enable Feature")
	boolean enableFeature() default false;

}
