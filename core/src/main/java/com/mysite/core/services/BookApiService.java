package com.mysite.core.services;

import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;

import com.mysite.core.config.MysiteAPIConfig;

@Component(service = BookApiService.class)
@Designate(ocd = MysiteAPIConfig.class)
public class BookApiService {
	
	private String url;
	private int limit;
	
	protected void activate(MysiteAPIConfig apiConfig) {
		url = apiConfig.baseUrl();
		limit = apiConfig.limit();
	}
	

    public String getBooks() throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet get = new HttpGet(url+"/products?limit"+limit);
        return EntityUtils.toString(client.execute(get).getEntity());
    }
    
    
    public String postBook(String json) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost(url+"products/add");
        post.setHeader("Content-Type", "application/json");
        post.setEntity(new StringEntity(json));
        return EntityUtils.toString(client.execute(post).getEntity());
    }
}