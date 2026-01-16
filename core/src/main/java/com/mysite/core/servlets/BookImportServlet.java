package com.mysite.core.servlets;

import java.io.IOException;

import javax.jcr.Node;
import javax.jcr.Session;
import javax.servlet.Servlet;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.core.services.BookApiService;

@Component(service = Servlet.class,
        property = {
                "sling.servlet.paths=/bin/import-books",
                "sling.servlet.methods=GET"
        })
public class BookImportServlet extends SlingSafeMethodsServlet {

    @Reference
    private BookApiService bookApiService;

    @Override
    protected void doGet(SlingHttpServletRequest req, SlingHttpServletResponse resp) throws IOException {
        try {
            String json = bookApiService.getBooks();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(json);
            JsonNode books = rootNode.get("products");

            Session session = req.getResourceResolver().adaptTo(Session.class);
            Node root = session.getRootNode();

            Node contentNode = root.hasNode("content") 
                    ? root.getNode("content") 
                    : root.addNode("content");

            Node booksNode = contentNode.hasNode("books")
                    ? contentNode.getNode("books")
                    : contentNode.addNode("books");

            for (JsonNode b : books) {
                String nodeName = "book-" + b.get("id").asInt();

                Node bookNode = booksNode.hasNode(nodeName)
                        ? booksNode.getNode(nodeName)
                        : booksNode.addNode(nodeName);

                bookNode.setProperty("title", b.get("title").asText());
                bookNode.setProperty("price", b.get("price").asDouble());
                bookNode.setProperty("category", b.get("category").asText());
            }

            session.save();
            resp.setContentType("text/plain");
            resp.getWriter().write("Books imported to /content/books");

        } catch (Exception e) {
        	 resp.getWriter().write("Error occured "+e.getMessage());
        }
    }

   
}
