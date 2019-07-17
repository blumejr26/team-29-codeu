const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');

function loadRestaurantData() {
  fetch('/restaurant?name='+name).then(function(response) {
    return response.json();
  }).then((restaurant) => {
    console.log(restaurant);
  })
}