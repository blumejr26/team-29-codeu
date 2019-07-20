const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

function loadRestaurantData() {
  fetch('/restaurant?id='+id).then(function(response) {
    return response.json();
  }).then((restaurant) => {
    if (restaurant === '') {
      document.getElementById('name').innerHTML = "404: we don't recognize this location :(";
    }
    else {
      document.getElementById('name').innerHTML = restaurant.name;
      document.getElementById('address').appendChild(document.createTextNode("Address: "+restaurant.address+", "+restaurant.zipcode.toString()));
//      document.getElementById('deals').innerHTML = "Deals: ";
      document.getElementById('restaurant-id-deal').value = id;
      document.getElementById('restaurant-name-deal').value = restaurant.name;
      fetch('/deals?restaurant='+restaurant.name).then(function(response) {
        return response.json();
      }).then((deals) => {
        const dealsDiv = document.createElement('div');
        if (deals.length === 0) {
          dealsDiv.appendChild(document.createTextNode('There are no deals for this restaurant!'));
        }
        else {
          deals.forEach((deal) => {
            const div = document.createElement('div');
            div.innerHTML = deal
            dealsDiv.appendChild(div);
          });
        }
        document.getElementById('deals').appendChild(dealsDiv);
      });
//      document.getElementById('reviews').innerHTML = "Reviews: ";
      document.getElementById('restaurant-id-review').value = id;
      fetch('/reviews?restaurant='+id).then(function(response) {
        return response.json();
      }).then((reviews) => {
        const reviewsDiv = document.createElement('div');
        if (reviews.length === 0) {
          reviewsDiv.appendChild(document.createTextNode('There are no reviews for this restaurant!'));
        }
        else {
          reviewsDiv.appendChild(document.createTextNode('This restaurant has '+reviews.length.toString()+ ' reviews.'));
          console.log(restaurant.averageRating);
          reviewsDiv.appendChild(document.createTextNode('Average Rating: '+restaurant.averageRating.toString()));
          reviews.forEach((review) => {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = review.user;
            const timeDiv = document.createElement('div');
            timeDiv.appendChild(document.createTextNode(new Date(review.timestamp)));
            const textDiv = document.createElement('div');
            textDiv.innerHTML = review.text;
            const ratingDiv = document.createElement('div');
            ratingDiv.appendChild(document.createTextNode('Rating: '+review.rating.toString()));
            reviewsDiv.appendChild(userDiv);
            reviewsDiv.appendChild(timeDiv);
            reviewsDiv.appendChild(textDiv);
            reviewsDiv.appendChild(ratingDiv);
          });
        }
        document.getElementById('reviews').appendChild(reviewsDiv);
      });
      
      document.getElementById('restaurant-id-fav').value = id;
      document.getElementById('restaurant-name-fav').value = restaurant.name;
      fetch('/favorites').then(function(response) {
        return response.json();
      }).then(userFavs => {
        var found = false;
        userFavs.forEach(fav => {
          if (fav.restaurantName === restaurant.name) {
            document.getElementById('fav-mode').value = 'remove';
            document.getElementById('fav-button').value = 'Remove from favorites';
            found = true;
          }
        });
        if (!found) {
          document.getElementById('fav-mode').value = 'add';
          document.getElementById('fav-button').value = 'Add to favorites!';
        }
      });
    }
  });
}