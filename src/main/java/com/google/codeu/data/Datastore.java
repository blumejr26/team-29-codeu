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

package com.google.codeu.data;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.FetchOptions;
//import com.google.appengine.api.datastore.EntityNotFoundException;
import java.io.File;
import java.io.InputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.Set;
import java.util.HashSet;
import java.util.Scanner;

/** Provides access to the data stored in Datastore. */
public class Datastore {

  private DatastoreService datastore;
  static boolean loadCSV = true;

  public Datastore() {
    datastore = DatastoreServiceFactory.getDatastoreService();
    if (loadCSV) {
      Query query = new Query("Restaurant");
      PreparedQuery results = datastore.prepare(query);
      if (results.countEntities(FetchOptions.Builder.withLimit(1)) == 0) {
        try {
          InputStream inputStream = new FileInputStream(new File("WEB-INF/restaurants.csv"));
          Scanner scanner = new Scanner(inputStream);
          scanner.nextLine(); // to skip the first line of column headers; alternatively, can get rid of column headers in csv
          while(scanner.hasNextLine()) {
            System.out.println("*************************GOT IN***************************");
            String line = scanner.nextLine();
            String[] cells = line.split(",");

            String name = cells[0].trim();
            String streetAddress = cells[1].trim(); 
            int zipcode = Integer.parseInt(cells[2].trim());
            double lat = Double.parseDouble(cells[3].trim());
            double lng = Double.parseDouble(cells[4].trim());
            String category = cells[5].trim();

            storeRestaurant(new Restaurant(name, streetAddress, zipcode, lat, lng, category));
          }
          scanner.close();        
        }
        catch (FileNotFoundException e) {
          // execution should never get here!
        }
      }
      
      loadCSV = false;
    }
  }

  public Set<String> getUsers(){
    Set<String> users = new HashSet<>();
    Query query = new Query("Message");
    PreparedQuery results = datastore.prepare(query);
    for(Entity entity : results.asIterable()) {
      users.add((String) entity.getProperty("user"));
    }
    return users;
  }


  /** Stores the Message in Datastore. */
  public void storeRestaurant(Restaurant restaurant) {
    Entity restaurantEntity = new Entity("Restaurant", restaurant.getId().toString());
    restaurantEntity.setProperty("name", restaurant.getName());
    restaurantEntity.setProperty("address", restaurant.getAddress());
    restaurantEntity.setProperty("zipcode", restaurant.getZipcode());
    restaurantEntity.setProperty("latitude", restaurant.getLatitude());
    restaurantEntity.setProperty("longitude", restaurant.getLongitude());
    restaurantEntity.setProperty("category", restaurant.getCategory());
    datastore.put(restaurantEntity);
  }

  /** Stores the Message in Datastore. */
  public void storeReview(Review review) {
    Entity reviewEntity = new Entity("Review", review.getId().toString());
    reviewEntity.setProperty("user", review.getUser());
    reviewEntity.setProperty("restaurant", review.getRestaurant());
    reviewEntity.setProperty("text", review.getText());
    reviewEntity.setProperty("rating", review.getRating());
    reviewEntity.setProperty("timestamp", review.getTimestamp());

    datastore.put(reviewEntity);
  }  

  /** Stores the Message in Datastore. */
  public void storeMessage(Message message) {
    Entity messageEntity = new Entity("Message", message.getId().toString());
    messageEntity.setProperty("user", message.getUser());
    messageEntity.setProperty("text", message.getText());
    messageEntity.setProperty("timestamp", message.getTimestamp());

    datastore.put(messageEntity);
  }

  /**
   * Gets messages posted by a specific user.
   *
   * @return a list of messages posted by the user, or empty list if user has never posted a
   *     message. List is sorted by time descending.
   */
  public List<Message> getMessages(String user) {
    List<Message> messages = new ArrayList<>();

    Query query =
        new Query("Message")
            .setFilter(new Query.FilterPredicate("user", FilterOperator.EQUAL, user))
            .addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      try {
        String idString = entity.getKey().getName();
        UUID id = UUID.fromString(idString);
        String text = (String) entity.getProperty("text");
        long timestamp = (long) entity.getProperty("timestamp");

        Message message = new Message(id, user, text, timestamp);
        messages.add(message);
      } catch (Exception e) {
        System.err.println("Error reading message.");
        System.err.println(entity.toString());
        e.printStackTrace();
      }
    }

    return messages;
  }

  public List<Restaurant> getRestaurants() {
    List<Restaurant> restaurants = new ArrayList<>();

    Query query = new Query("Restaurant");
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      try {
        String name = (String) entity.getProperty("name");
        String address = (String) entity.getProperty("address");
        int zipcode = ((Long) entity.getProperty("zipcode")).intValue();
        double lat = (double) entity.getProperty("latitude");
        double lng = (double) entity.getProperty("longitude");
        String category = (String) entity.getProperty("category");
        Restaurant restaurant = new Restaurant(name, address, zipcode, lat, lng, category);
        restaurants.add(restaurant);
      } catch (Exception e) {
        System.err.println("Error loading restaurants.");
        System.err.println(entity.toString());
        e.printStackTrace();
      }
    }

    return restaurants;
  }
  
  public List<Review> getReviews(String restaurant) {
    List<Review> reviews = new ArrayList<>();

    Query query = new Query("Review").setFilter(new Query.FilterPredicate("restaurant", FilterOperator.EQUAL, restaurant))
            .addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      try {
        String user = (String) entity.getProperty("user");
        String text = (String) entity.getProperty("text");
        int rating = ((Long) entity.getProperty("rating")).intValue();
        long timestamp = (long) entity.getProperty("timestamp");
        Review review = new Review(user, restaurant, text, rating, timestamp);
        reviews.add(review);
      } catch (Exception e) {
        System.err.println("Error loading restaurants.");
        System.err.println(entity.toString());
        e.printStackTrace();
      }
    }

    return reviews;
  }
  
  /**
   * Gets messages posted by all users
   *
   * @return a list of messages posted by all users. List is sorted by time
   *     descending.
   */
  public List<Message> getAllMessages() {
    List<Message> messages = new ArrayList<>();

    Query query = new Query("Message").addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      try {
        String user = (String) entity.getProperty("user");
        List<Message> userMessages = getMessages(user);
        for (Message message : userMessages) {
            messages.add(message);
        }
      } catch (Exception e) {
        System.err.println("Error reading user messages.");
        System.err.println(entity.toString());
        e.printStackTrace();
      }
    }

    return messages;
  }

  /* Returns the total number of messages for all users. */

  public int getTotalMessageCount(){
    Query query = new Query("Message");
    PreparedQuery results = datastore.prepare(query);
    return results.countEntities(FetchOptions.Builder.withLimit(1000));

  }

}
