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

// Get ?user=XYZ parameter value
const urlParams = new URLSearchParams(window.location.search);
const parameterUsername = urlParams.get('user');
const admins = ["test@example.com", "urviagrawal99@gmail.com"];

// URL must include ?user=XYZ parameter. If not, redirect to homepage.
if (!parameterUsername) {
  window.location.replace('/');
}

/** Sets the page title based on the URL parameter username. */
function setPageTitle() {
  document.getElementById('page-title').innerText = parameterUsername;
  document.title = parameterUsername + ' - User Page';
}

/** Fetches data and populates the UI of the page. */
function buildUI() {
  setPageTitle();
  fetch('/favorites?user='+parameterUsername).then(function(response) {
    return response.json();
  }).then(favIds => {
    if (favIds.length === 0) {
      document.getElementById('favorites').appendChild(document.createTextNode('You have no favorites!'));
    } else {
      favIds.forEach(fav => {
        const link = document.createElement('a');
        link.appendChild(document.createTextNode(fav.restaurantName));
        link.href = '/restaurant-page.html?id='+fav.restaurantId;
        document.getElementById('favorites').appendChild(link);
      });
    }
  });
  fetch('/requested-restaurants').then(function(response) {
    return response.json();
  }).then(restaurants => {
    if (restaurants.length !== 0) {
      const adminDiv = document.getElementById('admin-only');
      const div = document.createElement('div');
      div.innerHTML = '<h3>Requested Restaurants</h3>';
      adminDiv.appendChild(div);
      restaurants.forEach(restaurant => {
        const d = document.createElement('div');
        d.innerHTML = restaurant.name + '   |   ' + restaurant.city;
        adminDiv.appendChild(d);
      });
    }
  });
}