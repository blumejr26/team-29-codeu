function createMarker(map, lat, lng, name, address, zipcode) {
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

function createRestaurantsMap(restaurants) {
//  fetch('/restaurant-data').then(function(response) {
//    return response.json();
//  }).then((restaurants) => {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.4428, lng: -79.943},
      zoom: 11
    });
    restaurants.forEach((restaurant) => {
      createMarker(map, restaurant.lat, restaurant.lng, restaurant.name, restaurant.address, restaurant.zipcode);
    });
//  });
}

function loadResults() {
  fetch('/restaurant-data').then(function(response) {
    return response.json();
  }).then((restaurants) => {
      createRestaurantsMap(restaurants);
  });
}



