package com.mysite.core.servlets;

import java.io.BufferedReader;

import javax.servlet.Servlet;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.mysite.core.services.BookPostService;

@Component(service = Servlet.class, property = { "sling.servlet.paths=/bin/post-book", "sling.servlet.methods=POST" })
public class BookPostServlet extends SlingAllMethodsServlet {

	@Reference
	private BookPostService postService;

	@Override
	protected void doPost(SlingHttpServletRequest req, SlingHttpServletResponse resp) {
	    try {
	        StringBuilder sb = new StringBuilder();
	        BufferedReader reader = req.getReader();
	        String line;

	        while ((line = reader.readLine()) != null) {
	            sb.append(line);
	        }

	        String json = sb.toString();  

	        String result = postService.postBook(json);
	        resp.setContentType("application/json");
	        resp.getWriter().write(result);

	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	}

}
