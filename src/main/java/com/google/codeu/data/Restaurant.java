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

import java.util.UUID;

/** A single message posted by a user. */
public class Restaurant {

  private UUID id;
  private String name;
  private String address;
  private int zipcode;
  private double latitude;
  private double longitude;
  private String category;

  /**
   * Constructs a new {@link Message} posted by {@code user} with {@code text} content. Generates a
   * random ID and uses the current system time for the creation time.
   */
  public Restaurant(String name, String address, int zipcode, double latitude, double longitude, String category) {
    this.id = UUID.randomUUID();
    this.name = name;
    this.address = address;
    this.zipcode = zipcode;
    this.latitude = latitude;
    this.longitude = longitude;
    this.category = category;
  }

  public UUID getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getAddress() { return address;  }
  
  public int getZipcode() {
    return zipcode;
  }
  
  public double getLatitude() {
    return latitude;
  }

  public double getLongitude() {  return longitude; }

  public String getCategory() { return category; }
}
