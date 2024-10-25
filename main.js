import { changeMovies } from "./javascript/moviesGenerator.js";
import { TmdbApi } from "./javascript/tmdbApi.js"

const elements = {
  search_input: document.querySelector("#search_input"),
  search_form: document.querySelector("#search_form")
}

const tmdb = new TmdbApi();

//Chargement des films découvertes
const movies = await tmdb.discoverMovies(1);
changeMovies(movies, tmdb);

//Listenner de l'événement de recherche
elements.search_form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const list = await tmdb.searchMovies(elements.search_input.value, 1);
  changeMovies(list, tmdb);
});