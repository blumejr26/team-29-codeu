package com.google.codeu.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonElement;
import com.google.codeu.data.Restaurant;
import com.google.codeu.data.RequestedRestaurant;
import com.google.codeu.data.Datastore;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * Returns Restaurant data as a JSON array, e.g. [{"lat": 38.4404675, "lng": -122.7144313}]
 */
@WebServlet("/requested-restaurants")
public class RequestedRestaurantServlet extends HttpServlet {
  private Datastore datastore;

  @Override
  public void init() {
    datastore = new Datastore();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    
    List<RequestedRestaurant> restaurants = datastore.getRequestedRestaurants();
    Gson gson = new Gson();
    String json = gson.toJson(restaurants);
    response.getWriter().println(json);
    
  }
  
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    if (!userService.isUserLoggedIn()) {
      response.sendRedirect("/index.html");
      return;
    }

    String user = userService.getCurrentUser().getEmail();
    String name = Jsoup.clean(request.getParameter("restaurant-name"), Whitelist.none());
    String city = Jsoup.clean(request.getParameter("city"), Whitelist.none());
    String searchValue = Jsoup.clean(request.getParameter("search-value"), Whitelist.none());
    
    RequestedRestaurant restaurant = new RequestedRestaurant(UUID.randomUUID(), name, city, user);
    datastore.storeRequestedRestaurant(restaurant);

    response.sendRedirect("/search-results.html?location="+searchValue);
  }

}
