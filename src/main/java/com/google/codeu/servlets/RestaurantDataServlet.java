package com.google.codeu.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonArray;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Scanner;

/**
 * Returns Restaurant data as a JSON array, e.g. [{"lat": 38.4404675, "lng": -122.7144313}]
 */
@WebServlet("/restaurant-data")
public class RestaurantDataServlet extends HttpServlet {

  private JsonArray restaurantArray;

  @Override
  public void init() {
    restaurantArray = new JsonArray();
    Gson gson = new Gson();
    Scanner scanner = new Scanner(getServletContext().getResourceAsStream("/WEB-INF/restaurants.csv"));
    scanner.nextLine(); // to skip the first line of column headers; alternatively, can get rid of column headers
    while(scanner.hasNextLine()) {
      String line = scanner.nextLine();
      String[] cells = line.split(",");
    
      String name = cells[0].trim();
      String streetAddress = cells[1].trim(); 
      int zipcode = Integer.parseInt(cells[2].trim());
      double lat = Double.parseDouble(cells[3].trim());
      double lng = Double.parseDouble(cells[4].trim());
      String category = cells[5].trim();

      restaurantArray.add(gson.toJsonTree(new Restaurant(name, streetAddress, zipcode, lat, lng, category)));
    }
    scanner.close();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    response.getOutputStream().println(restaurantArray.toString());
  }

  // This class could be its own file if we needed it outside this servlet
  private static class Restaurant {
    String name;
    String address;
    int zipcode;
    double lat;
    double lng;
    String category;

    private Restaurant(String name, String address, int zipcode, double lat, double lng, String category) {
      this.name = name;
      this.address = address;
      this.zipcode = zipcode;
      this.lat = lat;
      this.lng = lng;
      this.category = category;
    }
  }
}
