package com.mysite.core.services;

import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.osgi.service.component.annotations.Component;

@Component(service = BookApiService.class)
public class BookApiService {

    public String getBooks() throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet get = new HttpGet("https://dummyjson.com/products?limit=3");
        return EntityUtils.toString(client.execute(get).getEntity());
    }
}