package com.mysite.core.job;


import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.Session;

import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.mysite.core.services.AemServiceResolverProvider;

@Component(
	    service = JobConsumer.class,
	    property = JobConsumer.PROPERTY_TOPICS + "=dam/expiry/job"
	)
	public class ExpiryAssetJobConsumer implements JobConsumer {

	    @Reference
	    private AemServiceResolverProvider resolverProvider;
	    
	    @Reference
	    private QueryBuilder queryBuilder;


	    @Override
	    public JobResult process(Job job) {

	        try (ResourceResolver resolver = resolverProvider.getServiceResolver()) {
	        	Session session = resolver.adaptTo(Session.class);
	        	SimpleDateFormat formattedDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
	        	Map<String, String> predicates = new HashMap<>();
	        	predicates.put("path", "/content/dam/mysite");
	        	predicates.put("type", "dam:Asset");

	        	predicates.put("1_daterange.property", "jcr:content/metadata/prism:expirationDate");
	        	predicates.put("1_daterange.upperBound", formattedDate.format(System.currentTimeMillis()));
	        	predicates.put("1_daterange.upperOperation", "<=");

	        	predicates.put("p.limit", "-1");
	        	
	        	Query query = queryBuilder.createQuery(
	        	        PredicateGroup.create(predicates),
	        	        session
	        	);


	            for (Hit hit : query.getResult().getHits()) {
	                Resource asset = resolver.getResource(hit.getPath());
	                ModifiableValueMap meta =
	                    asset.getChild("jcr:content/metadata").adaptTo(ModifiableValueMap.class);

	                meta.put("assetStatus", "expired");
	            }
	            resolver.commit();
	            return JobResult.OK;

	        } catch (Exception e) {
	            return JobResult.FAILED;
	        }
	    }
	}
	