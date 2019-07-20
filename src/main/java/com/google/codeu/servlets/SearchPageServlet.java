package com.google.codeu.servlets;

import java.io.IOException;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.data.Datastore;
import com.google.gson.Gson;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;


/**
 * Handles fetching all messages for the public feed.
 */

@WebServlet("/search")
public class SearchPageServlet extends HttpServlet {
  
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    UserService userService = UserServiceFactory.getUserService();
    if (!userService.isUserLoggedIn()) {
      response.sendRedirect("/index.html");
      return;
    }

    String user = userService.getCurrentUser().getEmail();
//    String latitude = Jsoup.clean(request.getParameter("latitude"), Whitelist.none());
//    String longitude = Jsoup.clean(request.getParameter("longitude"), Whitelist.none());
    String location = Jsoup.clean(request.getParameter("location"), Whitelist.none());
      
//    response.sendRedirect("/search-results.html?latitude="+latitude+"&longitude="+longitude);
    response.sendRedirect("/search-results.html?location="+location);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    doGet(request, response);
  }
}
