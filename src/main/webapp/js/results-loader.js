const urlParams = new URLSearchParams(window.location.search);
let address = urlParams.get('location');
if (address) {
	address = address.trim();
}
let parameterLatitude;
let parameterLongitude;
let markersDict = new Object();
let restaurantsList;
let map;



function createRestaurantMarker(map, id, lat, lng, name, address, zipcode) {
  const marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map,
    title: name
  });
  var info = '<h3><a href=/restaurant-page.html?id='+id+'>'+name+'</a></h3>'+'<p>'+address+', '+zipcode.toString(10)+'</p>';
  var infoWindow = new google.maps.InfoWindow({
    content: info
  });
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
  markersDict[name] = marker;
}

function filterAndDisplayResults() {
  clearResults();
  const resultsContainer = document.getElementById('results-container');
  if (restaurantsList.length == 0) {
    resultsContainer.innerHTML = '<p>There are no restaurants matching this criteria.</p>';
  } else {
    resultsContainer.innerHTML = '';
  }
    
  var key = document.getElementById('selectSortKey').value;
  var radius = document.getElementById('searchRadius').value;
  (restaurantsList.sort(sortBy(key))).forEach((restaurant) => {
    var dist = distance(parseFloat(parameterLatitude), parseFloat(parameterLongitude), restaurant.lat, restaurant.lng);
    if (dist < radius) {
      // Create a marker for each restaurant on the map
      if (markersDict.hasOwnProperty(restaurant.name)) {
        markersDict[restaurant.name].setMap(map);
      }
      else {
        createRestaurantMarker(map, restaurant.id, restaurant.lat, restaurant.lng, restaurant.name, restaurant.address, restaurant.zipcode);
      }
      //List each restaurant
      const restaurantDiv = buildRestaurantDiv(restaurant, dist);
      resultsContainer.appendChild(restaurantDiv);
    }
    else {
      if (markersDict.hasOwnProperty(restaurant.name)) {
        markersDict[restaurant.name].setMap(null);
      }
      else {
        createRestaurantMarker(null, restaurant.id, restaurant.lat, restaurant.lng, restaurant.name, restaurant.address, restaurant.zipcode);
      }
    }
  });
}

function distance(lat1, lng1, lat2, lng2) {
  if ((lat1 == lat2) && (lng1 == lng2)) {
    return 0;
  } else {
    theta = lng1 - lng2;
    dist = Math.sin(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) + Math.cos(lat1 * Math.PI / 180) *                           Math.cos(lat2 * Math.PI / 180) * Math.cos(theta * Math.PI / 180);
    dist = Math.acos(dist);
    dist = dist * (180 / Math.PI);
    dist = dist * 60 * 1.1515;
    return (dist);
  }
}

function sortBy(key) {
  return function(a, b) {
    if (key === 'distance') {
      var distA = distance(parseFloat(parameterLatitude), parseFloat(parameterLongitude), a.lat, a.lng);
      var distB = distance(parseFloat(parameterLatitude), parseFloat(parameterLongitude), a.lat, a.lng)
      if (distA > distB) {
        return 1;
      } else if (distA < distB) {
        return -1;
      }
      return 0;
    }
    if (a[key] > b[key]) {
      return 1;
    } else if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  }
}

function clearResults() {
//  for (var i = 1; i < markersDict.length; i++) {
//    markersDict[i].setMap(null);
//  }
//  markersDict = [markersDict[0], markersDict[1]];
  var results = document.getElementById('results-container');
  while(results.lastChild){
    results.removeChild(results.firstChild);
  }
}

function buildRestaurantDiv(restaurant, dist) {  
  const nameLink = document.createElement('a');
  nameLink.classList.add('restaurant-name');
  nameLink.appendChild(document.createTextNode(restaurant.name));
  nameLink.href = '/restaurant-page.html?id=' + restaurant.id; // for the generic link
//  nameLink.href = '/restaurant1.html';  // using the static single restaurant page link for now

  const addressDiv = document.createElement('div');
  addressDiv.classList.add('restaurant-address');
  addressDiv.innerHTML = restaurant.address+', '+restaurant.zipcode.toString(10);
  
  const categoryDiv = document.createElement('div');
  categoryDiv.classList.add('restaurant-category');
  categoryDiv.innerHTML = restaurant.category+'\t'+Math.round(dist).toString(10)+" miles";
    
  const restaurantDiv = document.createElement('div');
  restaurantDiv.classList.add('restaurant-div');
  restaurantDiv.appendChild(nameLink);
  restaurantDiv.appendChild(addressDiv);
  restaurantDiv.appendChild(categoryDiv);

  return restaurantDiv;
}

function initialize() {
	if (!address) {
		// Do nothing if no address
		return;
	}
  var request = {
    query: address,
    fields: ['name', 'geometry'],
    locationBias: {lat: 49.1, lng: -79.9}
  };
  var service = new google.maps.places.PlacesService(document.createElement('div'));
  service.findPlaceFromQuery(request, function(results, status) {
//    console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      parameterLatitude = (results[0].geometry.location.lat()).toString();
      parameterLongitude = (results[0].geometry.location.lng()).toString();
      
      // Create a map
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: parseFloat(parameterLatitude), lng: parseFloat(parameterLongitude)},
        zoom: 11
      });
      var searchMarker = new google.maps.Marker({
        position: {lat: parseFloat(parameterLatitude), lng: parseFloat(parameterLongitude)},
        map: map
      });
      markersDict["user-search"] = searchMarker;

      fetch('/results?latitude='+parameterLatitude+'&longitude='+parameterLongitude).then(function(response) {
        return response.json();
      }).then((restaurants) => {
        restaurantsList = restaurants;
        filterAndDisplayResults();
      });

    } else {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 11
      });
      document.getElementById('results-container').innerHTML = "we don't recognize this location :(";
    }
  });
  
  document.getElementById('search-value').value = address;

  var selectSortKey = document.getElementById('selectSortKey');
  selectSortKey.addEventListener('change', function() {
    filterAndDisplayResults();
  });
  
  var searchRadius = document.getElementById('searchRadius');
  searchRadius.addEventListener('input', function() {
    filterAndDisplayResults();
  });

}



