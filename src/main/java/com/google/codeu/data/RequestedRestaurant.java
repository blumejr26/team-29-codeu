package com.google.codeu.data;

import java.util.UUID;


public class RequestedRestaurant {
  private UUID id;
  private String name;
  private String city;
  private String user;
  
  public RequestedRestaurant(UUID id, String name, String city, String user) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.user = user;
  }
  
  public UUID getId() {
    return id;
  }
  
  public String getName() {
    return name;
  }
  
  public String getCity() {
    return city;
  }
  
  public String getUser() {
    return user;
  }
}