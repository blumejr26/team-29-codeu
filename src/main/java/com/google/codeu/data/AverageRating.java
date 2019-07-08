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
public class AverageRating {
  
  private String restaurant;
  private double avgRating;
  private int reviewCount;

  /**
   * Constructs a new {@link Message} posted by {@code user} with {@code text} content. Generates a
   * random ID and uses the current system time for the creation time.
   */
  public AverageRating(String restaurant, double avgRating, int reviewCount) {
    this.restaurant = restaurant;
    this.avgRating = avgRating;
    this.reviewCount = reviewCount;
  }

  public String getRestaurant() {
    return restaurant;
  }
  
  public long getAvgRating() {
    return avgRating;
  }

  public long getReviewCount() {
    return reviewCount;
  }
}
