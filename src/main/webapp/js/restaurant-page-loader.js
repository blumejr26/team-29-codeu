const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');

function loadRestaurantData() {
  fetch('/restaurant?name='+name).then(function(response) {
    return response.json();
  }).then((restaurant) => {
    if (restaurant === '') {
      document.getElementById('name').innerHTML = "404: we don't recognize this location :(";
    }
    else {
      document.getElementById('name').innerHTML = restaurant.name;
      document.getElementById('address').innerHTML = restaurant.address + ', ' + restaurant.zipcode.toString();
    }
  })
}