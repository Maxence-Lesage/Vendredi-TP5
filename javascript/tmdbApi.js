
export class TmdbApi {
  #token;
  #tokenBearer;
  #options;

  constructor() {
    this.#token = "97fdb1ff4730ecd8515b0709a765393c";
    this.#tokenBearer = "eyJhbGciOiJIUzI1NiJ9eyJhdWQiOiI5N2ZkYjFmZjQ3MzBlY2Q4NTE1YjA3MDlhNzY1MzkzYyIsIm5iZiI6MTcyOTg1NjAzMC43ODgxNDUsInN1YiI6IjY3MWI4MGI1MWVhMzM5MjgyOTdkMjMyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jJ20RvhLaeMXVkQ6goXHJiFtFgaJ3XDFaSXWqYpfG4E";
    this.#options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.#tokenBearer}`
      }
    };
    this.page = 1;
    this.total_pages = 1;
  }

  async discoverMovies(pagination) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${pagination}&sort_by=popularity.desc&api_key=${this.#token}`, this.#options)
    const json = await response.json();
    const results = await json.results;
    this.page = json.page;
    this.total_pages = json.total_pages;

    return results;
  }

  async searchMovies(query, pagination) {
    if (query) {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=fr-FR&page=${pagination}&api_key=${this.#token}`, this.#options)
      const json = await response.json();
      const results = await json.results;
      this.page = json.page;
      this.total_pages = json.total_pages;

      return results;
    }
  }
}