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
  private long numberOfReviews;
  private double averageRating;
  
  public Restaurant(UUID id, String name, String address, int zipcode, double lat, double lng, String category) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.zipcode = zipcode;
    this.lat = lat;
    this.lng = lng;
    this.category = category;
    this.numberOfReviews = 0;
    this.averageRating = 0.0;
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
  
  public long getNumberOfReviews() {
    return numberOfReviews;
  }
  
  public double getAverageRating() {
    return averageRating;
  }
  
  public void setNumberOfReviews(long n) {
    numberOfReviews = n;
  }
  
  public void setAverageRating(double r) {
    averageRating = r;
  }
}