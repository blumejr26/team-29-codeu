package com.google.codeu.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonElement;
import com.google.codeu.data.Restaurant;
import com.google.codeu.data.Datastore;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


@WebServlet("/restaurant")
public class RestaurantPageServlet extends HttpServlet {
  private Datastore datastore;

  @Override
  public void init() {
    datastore = new Datastore();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    
    try {
      String id = request.getParameter("id");
      Restaurant restaurant = datastore.getRestaurant(id);
      Gson gson = new Gson();
      String json = gson.toJson(restaurant);
      response.getWriter().println(json);
    }
    catch (Exception e) {
      response.getWriter().println("");
    }
    
    
//    List<Restaurant> restaurants = datastore.getRestaurant(name);
//    if (restaurants.size() == 0) {
//      response.getWriter().println("");
//    }
//    else {
//      Gson gson = new Gson();
//      String json = gson.toJson(restaurants.get(0));
//      response.getWriter().println(json);
//    }
  }

}
