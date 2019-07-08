package com.google.codeu.data;

import java.util.UUID;


public class Restaurant {
  private UUID id;
  private String name;
  private String address;
  private int zipcode;
  private double lat;
  private double lng;
  private String category;

  public Restaurant(String name, String address, int zipcode, double lat, double lng, String category) {
    this.id = UUID.randomUUID();
    this.name = name;
    this.address = address;
    this.zipcode = zipcode;
    this.lat = lat;
    this.lng = lng;
    this.category = category;
  }
  
  public UUID getId() {
    return id;
  }
  
  public String getName() {
    return name;
  }
  
  public String getAddress() {
    return address;
  }
  
  public int getZipcode() {
    return zipcode;
  }
  
  public double getLatitude() {
    return lat;
  }
  
  public double getLongitude() {
    return lng;
  }
  
  public String getCategory() {
    return category;
  }
}