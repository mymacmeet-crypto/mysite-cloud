package com.mysite.core.services;

import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.*;
import org.apache.http.util.EntityUtils;
import org.osgi.service.component.annotations.Component;

@Component(service = BookPostService.class)
public class BookPostService {

    public String postBook(String json) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost("https://dummyjson.com/products/add");
        post.setHeader("Content-Type", "application/json");
        post.setEntity(new StringEntity(json));
        return EntityUtils.toString(client.execute(post).getEntity());
    }
}

