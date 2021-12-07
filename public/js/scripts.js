function getMovies() {
  document.querySelector(".movies").innerHTML = ``;
  fetch(`api/movies`)
    .then((response) => response.json())
    .then((data) => data.sort((a, b) => +b.releaseDate - +a.releaseDate))
    .then((movies) => renderMovies(movies));
}

function addMovie(event) {
  event.preventDefault();
  const { title, posterImage, releaseDate, description } = event.target;
  const recipe = {
    title: title.value,
    posterImage: posterImage.value,
    releaseDate: releaseDate.value,
    description: description.value,
  };
  fetch("api/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
    .then((response) => response.json())
    .then(getMovies);
}

function renderMovies(movies) {
  movies.forEach((recipe) => {
    // destructure
    const { _id, title, posterImage, releaseDate, description } = recipe;
    recipeEl = document.createElement("div");
    recipeEl.innerHTML = `
    <img src="img/${posterImage}" />
    <h3><a href="detail.html?recipe=${_id}">${title}</a></h3>
    <p>${description}</p>
    <p>${releaseDate}</p>
    <button class="delete" data-id=${_id} href="#">Delete</button>
  `;
    return document.querySelector(".movies").append(recipeEl);
  });
}

function deleteMovie(event) {
  fetch(`api/movies/${event.target.dataset.id}`, {
    method: "DELETE",
  }).then(getMovies());
}

// new
function seed() {
  fetch("api/import").then(getMovies);
}

function handleClicks(event) {
  if (event.target.matches("[data-id]")) {
    deleteMovie(event);
  } else if (event.target.matches("#seed")) {
    seed();
  }
}

document.addEventListener("click", handleClicks);

const addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", addMovie);

getMovies();
