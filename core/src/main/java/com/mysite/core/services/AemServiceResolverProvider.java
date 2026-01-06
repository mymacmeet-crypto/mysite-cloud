package com.mysite.core.services;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

@Component(service = AemServiceResolverProvider.class)
public class AemServiceResolverProvider {

	private static final String SUBSERVICE = "myproject-service";

    @Reference
    private ResourceResolverFactory resolverFactory;

    public ResourceResolver getServiceResolver() {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put(ResourceResolverFactory.SUBSERVICE, SUBSERVICE);
            return resolverFactory.getServiceResourceResolver(params);
        } catch (Exception e) {
            throw new IllegalStateException("Unable to obtain service ResourceResolver", e);
        }
    }
}
