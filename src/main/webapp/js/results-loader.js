const urlParams = new URLSearchParams(window.location.search);
const parameterLatitude = urlParams.get('latitude');
const parameterLongitude = urlParams.get('longitude');

function createRestaurantMarker(map, lat, lng, name, address, zipcode) {
  const marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map,
    title: name
  });
  var info = '<h3>'+name+'</h3>'+'<p>'+address+', '+zipcode.toString(10)+'</p>';
  var infoWindow = new google.maps.InfoWindow({
    content: info
  });
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}

function fetchRestaurants(map) {
  fetch('/restaurant-data?latitude='+parameterLatitude+'&longitude='+parameterLongitude).then(function(response) {
    return response.json();
  }).then((restaurants) => {
    const resultsContainer = document.getElementById('results-container');
    if (restaurants.length == 0)
    if (restaurants.length == 0) {
      resultsContainer.innerHTML = '<p>There are no restaurants matching this criteria.</p>';
    } else {
      resultsContainer.innerHTML = '';
    }
    
    restaurants.forEach((restaurant) => {
      // Create a marker for each restaurant on the map
      createRestaurantMarker(map, restaurant.lat, restaurant.lng, restaurant.name, restaurant.address, restaurant.zipcode);
      
      //List each restaurant
      const restaurantDiv = buildRestaurantDiv(restaurant);
      resultsContainer.appendChild(restaurantDiv);
    });
  });
}

function buildRestaurantDiv(restaurant) {
  const nameDiv = document.createElement('div');
  nameDiv.classList.add('restaurant-name');
  nameDiv.appendChild(document.createTextNode(restaurant.name));

  const addressDiv = document.createElement('div');
  addressDiv.classList.add('restaurant-address');
  addressDiv.innerHTML = restaurant.address+', '+restaurant.zipcode.toString(10);
  
  const categoryDiv = document.createElement('div');
  categoryDiv.classList.add('restaurant-category');
  categoryDiv.innerHTML = restaurant.category;
    
  const restaurantDiv = document.createElement('div');
  restaurantDiv.classList.add('restaurant-div');
  restaurantDiv.appendChild(nameDiv);
  restaurantDiv.appendChild(addressDiv);
  restaurantDiv.appendChild(categoryDiv);

  return restaurantDiv;
}

function loadResults() {
  // Create a map
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: parameterLatitude, lng: parameterLongitude},
    zoom: 11
  });

  // Display all results - on map and as a list
  fetchRestaurants(map);
}



