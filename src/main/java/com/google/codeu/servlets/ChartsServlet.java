/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.codeu.servlets;

import java.io.IOException;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.codeu.data.Datastore;
import com.google.codeu.data.Review;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import java.util.Scanner;


/** Handles restaurant names and displays their overall ratings to the user. */
@WebServlet("/eatschart")
public class ChartsServlet extends HttpServlet {

    private Datastore datastore;

    @Override
    public void init() {
      datastore = new Datastore();
    }

  // This won't compile yet, pretty much got stuck here with creating a servlet to put the restaurant data in JSON form and use it in a javascript to display the chart
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
      response.setContentType("application/json");

      List<Review> reviews = datastore.getReviews();
      Gson gson = new Gson();
      String json = gson.toJson(reviews);
      response.getWriter().println(json);
    }
}


 /* private JsonArray restaurantRatingArray;

  private static class restaurantRating {
    String name;
    double rating;

    private restaurantRating (String name, double rating) {
      this.name = name;
      this.rating = rating;
    }
  }

  @Override
  public void init() {
    restaurantRatingArray = new JsonArray();
    Gson gson = new Gson();
    Scanner scanner = new Scanner(getServletContext().getResourceAsStream("/WEB-INF/restaurant-ratings.csv"));
    scanner.nextLine(); //skips first line (the csv header)
    while(scanner.hasNextLine()) {
      String line = scanner.nextLine();
      String[] cells = line.split(",");

      String curName = cells[1];
      double curRating = Double.parseDouble(cells[2]);

      restaurantRatingArray.add(gson.toJsonTree(new restaurantRating(curName, curRating)));
    }
    scanner.close();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    response.getOutputStream().println(restaurantRatingArray.toString());
  }

}*/