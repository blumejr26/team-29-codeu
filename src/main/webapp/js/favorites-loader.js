/*function favoriteRestaurant(list){
    var text = "";
    var inputs = document.querySelectorAll("input[type=text]");
    for (var i = 0; i < inputs.length; i++) {
        text += inputs[i].value;
    }
    var li = document.createElement("li");
    var node = document.createTextNode(text);
    li.appendChild(node);
    document.getElementById("list").appendChild(li);
}*/

// I adapted this from your feed-loader.js
function fetchFavorites() {
  const url = '/favorites';
  fetch(url).then((response) => {
    return response.json();
  }).then((favorites) => {
    const favoriteContainer = document.getElementById("favorites-list-container");
    if(favorites.length == 0) {
      favoriteContainer.innerHTML = '<p>There are no favorite restaurants saved yet.</p>';
    }
    else {
      favoriteContainer.innerHTML = '';
    }

    favorites.forEach((favorite) => {
          const favoriteDiv = buildFavoriteDiv(favorite);
          favoriteContainer.appendChild(favoriteDiv);
        });
  });
}

function buildFavoriteDiv(favorite) {
  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('favorite-body');

  bodyDiv.appendChild(document.createTextNode(favorite.text));

  const favoriteDiv = document.createElement('div');
  favoriteDiv.classList.add("favorites-div");
  favoriteDiv.appendChild(headerDiv);
  favoriteDiv.appendChild(bodyDiv);

  return favoriteDiv;
}

// Fetch data and populate the UI of the page
function buildUI() {
  fetchFavorites();
}

