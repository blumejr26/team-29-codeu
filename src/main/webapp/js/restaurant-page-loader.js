const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

function loadRestaurantData() {
  fetch('/restaurant?id='+id.toString()).then(function(response) {
    return response.json();
  }).then((restaurant) => {
    if (restaurant === '') {
      document.getElementById('name').innerHTML = "404: we don't recognize this location :(";
    }
    else {
      document.getElementById('name').innerHTML = restaurant.name;
      document.getElementById('address').innerHTML = restaurant.address + ', ' + restaurant.zipcode.toString();
      document.getElementById('deals').innerHTML = "Deals: ";
      document.getElementById('reviews').innerHTML = "Reviews: ";
      fetch('/reviews?restaurant='+restaurant.name).then(function(response) {
        return response.json();
      }).then((reviews) => {
        const reviewsDiv = document.createElement('div');
        if (reviews.length === 0) {
          reviewsDiv.innerHTML = 'There are no reviews for this restaurant!';
        }
        else {
          reviews.forEach((review) => {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = review.user;
            const timeDiv = document.createElement('div');
            timeDiv.appendChild(document.createTextNode(new Date(review.timestamp)));
            const textDiv = document.createElement('div');
            textDiv.innerHTML = review.text;
            reviewsDiv.appendChild(userDiv);
            reviewsDiv.appendChild(userDiv);
            reviewsDiv.appendChild(userDiv);
          });
        }
        document.getElementById('reviews').appendChild(reviewsDiv);
      })
    }
  });
}