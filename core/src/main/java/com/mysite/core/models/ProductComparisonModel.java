package com.mysite.core.models;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.core.pojo.ComparisonResponse;
import com.mysite.core.pojo.Pricing;
import com.mysite.core.pojo.Product;
import com.mysite.core.pojo.Range;
import com.mysite.core.pojo.Rating;
import com.mysite.core.pojo.SpecValue;
import com.mysite.core.pojo.Specification;

@Model(
	    adaptables = SlingHttpServletRequest.class,
	    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
	)
	public class ProductComparisonModel {

	    @SlingObject
	    private ResourceResolver resourceResolver;

	    private ComparisonResponse response;

	    @PostConstruct
	    protected void init() throws JsonMappingException, JsonProcessingException {
	        String graphqlUrl = "http://localhost:4502/graphql/execute.json/mysite/AllProductList";
	        String json = executeGraphQL(graphqlUrl);
	        response = transform(json);
	    }

	    public ComparisonResponse getResponse() {
	        return response;
	    }
	    
	    private String executeGraphQL(String url) {
	    	CredentialsProvider creds = new BasicCredentialsProvider();
	    	creds.setCredentials(
	    	    AuthScope.ANY,
	    	    new UsernamePasswordCredentials("admin", "admin")
	    	);
	        try (CloseableHttpClient client = HttpClients.custom()
	        	    .setDefaultCredentialsProvider(creds)
	        	    .build()) {
	            HttpGet get = new HttpGet(url);
	            get.setHeader("Accept", "application/json");

	            try (CloseableHttpResponse response = client.execute(get)) {
	                return EntityUtils.toString(response.getEntity());
	            }
	        } catch (Exception e) {
	            // log error
	        }
	        return "{}";
	    }
	    
	    private ComparisonResponse transform(String json) throws JsonMappingException, JsonProcessingException {
	        ObjectMapper mapper = new ObjectMapper();

	        JsonNode root = mapper.readTree(json)
	            .path("data")
	            .path("productCfModelList")
	            .path("items");

	        ComparisonResponse comparison = new ComparisonResponse();
	        comparison.setTitle("Compare Products");

	        Map<String, Specification> specMap = new LinkedHashMap<>();
	        List<Product> products = new ArrayList<>();

	        int index = 1;
	        for (JsonNode productNode : root) {
	            String productKey = "product_" + index++;

	            Product product = buildProduct(productNode, productKey);
	            products.add(product);

	            for (JsonNode specNode : productNode.path("specifications")) {
	                mergeSpecification(specMap, specNode, productKey);
	            }
	        }

	        comparison.setProducts(products);
	        comparison.setSpecifications(new ArrayList<>(specMap.values()));
	        return comparison;
	    }
	    
	    private Product buildProduct(JsonNode node, String productKey) {
	        Product product = new Product();
	        product.setId(productKey);
	        product.setName(node.path("name").asText());
	        product.setImageUrl(node.path("image_url").path("_path").asText());

	        Pricing pricing = new Pricing();
	        pricing.setCurrentPrice(node.path("current_price").asDouble());
	        pricing.setOriginalPrice(
	            node.path("orignal_price").isNull() ? null : node.path("orignal_price").asDouble()
	        );
	        pricing.setCurrency(node.path("currency").asText());
	        pricing.setDiscountPercentage(node.path("discount_percentage").asDouble());

	        Rating rating = new Rating();
	        rating.setAverage(node.path("rating_average").asDouble());
	        rating.setScale(node.path("rating_scale").asInt());

	        product.setPricing(pricing);
	        product.setRating(rating);
	        return product;
	    }
	    
	    private void mergeSpecification(
	    	    Map<String, Specification> specMap,
	    	    JsonNode specNode,
	    	    String productKey
	    	) {
	    	    String key = specNode.path("key").asText();

	    	    Specification spec = specMap.computeIfAbsent(key, k -> {
	    	        Specification s = new Specification();
	    	        s.setKey(k);
	    	        s.setLabel(specNode.path("label").asText());
	    	        s.setUnit(specNode.path("unit").isNull() ? null : specNode.path("unit").asText());
	    	        s.setType(specNode.path("type").asText());
	    	        s.setValues(new LinkedHashMap<>());
	    	        return s;
	    	    });

	    	    SpecValue value = new SpecValue();

	    	    if ("range".equals(spec.getType())) {
	    	        Range range = new Range();
	    	        range.setMin(specNode.path("minValue").asInt());
	    	        range.setMax(specNode.path("maxValue").asInt());
	    	        value.setValue(range);
	    	        value.setDisplay(range.getMin() + "–" + range.getMax());
	    	    } else if ("boolean".equals(spec.getType())) {
	    	        boolean bool = specNode.path("value").asBoolean();
	    	        value.setValue(bool);
	    	        value.setDisplay(bool ? "✓" : "✗");
	    	    } else {
	    	        String val = specNode.path("value").asText();
	    	        value.setValue(val);
	    	        value.setDisplay(
	    	            spec.getUnit() != null ? val + spec.getUnit() : val
	    	        );
	    	    }

	    	    spec.getValues().put(productKey, value);
	    	}



}
