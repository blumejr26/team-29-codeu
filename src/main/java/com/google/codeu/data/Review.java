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
public class Review {

  private UUID id;
  private String restaurant;
  private String user;
  private String text;
  private int rating;
  private long timestamp;

  /**
   * Constructs a new {@link Review} posted by {@code user} with {@code text} content. Generates a
   * random ID and uses the current system time for the creation time.
   */
  public Review(String user, String restaurant, String text, int rating, long timestamp) {
    this.id = UUID.randomUUID();
    this.restaurant = restaurant;
    this.user = user;
    this.text = text;
    this.rating = rating;
    this.timestamp = timestamp;
  }

  public UUID getId() {
    return id;
  }

  public String getUser() {
    return user;
  }

  public String getRestaurant() {
    return restaurant;
  }
  
  public String getText() {
    return text;
  }
  
  public long getRating() {
    return rating;
  }

  public long getTimestamp() {
    return timestamp;
  }
}
