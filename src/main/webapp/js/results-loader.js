const urlParams = new URLSearchParams(window.location.search);
const address = urlParams.get('location').trim();
let parameterLatitude;
let parameterLongitude;
var userLatitude = 40.4;
var userLongitude = -79.9;
var markers = [];
let restaurantsList;



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
  markers.push(marker);
}

function filterAndDisplayResults(map) {
  clearResults(map);
  const resultsContainer = document.getElementById('results-container');
  if (restaurantsList.length == 0) {
    resultsContainer.innerHTML = '<p>There are no restaurants matching this criteria.</p>';
  } else {
    resultsContainer.innerHTML = '';
  }
    
  var key = document.getElementById('selectSortKey').value;
  var radius = document.getElementById('searchRadius').value;
  (restaurantsList.sort(sortBy(key))).forEach((restaurant) => {
    if (restaurant.distance < radius) {
      // Create a marker for each restaurant on the map
      createRestaurantMarker(map, restaurant.lat, restaurant.lng, restaurant.name, restaurant.address, restaurant.zipcode);
      //List each restaurant
      const restaurantDiv = buildRestaurantDiv(restaurant);
      resultsContainer.appendChild(restaurantDiv);
    }
  });
}

function sortBy(key) {
  return function(a, b) {
    if (a[key] > b[key]) {
      return 1;
    } else if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  }
}

function clearResults(map) {
  for (var i = 2; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [markers[0], markers[1]];
  var results = document.getElementById('results-container');
  while(results.lastChild){
    results.removeChild(results.firstChild);
  }
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
  categoryDiv.innerHTML = restaurant.category+'\t'+Math.round(restaurant.distance).toString(10)+" miles";
    
  const restaurantDiv = document.createElement('div');
  restaurantDiv.classList.add('restaurant-div');
  restaurantDiv.appendChild(nameDiv);
  restaurantDiv.appendChild(addressDiv);
  restaurantDiv.appendChild(categoryDiv);

  return restaurantDiv;
}

function initialize() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;
    }, function() {
    });
  }

  if (address === '') {
    parameterLatitude = userLatitude.toString();
    parameterLongitude = userLongitude.toString();
  }
  else {
    var request = {
      query: address,
      fields: ['name', 'geometry'],
      locationBias: {lat: userLatitude, lng: userLongitude}
    };
    var service = new google.maps.places.PlacesService(document.createElement('div'));
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        parameterLatitude = (results[0].geometry.location.lat()).toString();
        parameterLongitude = (results[0].geometry.location.lng()).toString();
      }
    });
  }

  // Create a map
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: parseFloat(parameterLatitude), lng: parseFloat(parameterLongitude)},
    zoom: 11
  });
  var searchMarker = new google.maps.Marker({
    position: {lat: parseFloat(parameterLatitude), lng: parseFloat(parameterLongitude)},
    map: map
  });
  const userMarker = new google.maps.Marker({
    position: {lat: userLatitude, lng: userLongitude},
    map: map
  });
  markers.push(searchMarker);
  markers.push(userMarker);
    
  fetch('/restaurant-data?latitude='+parameterLatitude+'&longitude='+parameterLongitude).then(function(response) {
    return response.json();
  }).then((restaurants) => {
    restaurantsList = restaurants;
    filterAndDisplayResults(map, 'distance');
  });

  var selectSortKey = document.getElementById('selectSortKey');
  selectSortKey.addEventListener('change', function() {
    filterAndDisplayResults(map);
  });
  
  var searchRadius = document.getElementById('searchRadius');
  searchRadius.addEventListener('input', function() {
    filterAndDisplayResults(map);
  });

}



