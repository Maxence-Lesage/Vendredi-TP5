const elements = {
  search_input: document.querySelector("#search_input"),
  film_list: document.querySelector(".film_list"),
  pagination: document.querySelector(".pagination")
}

export function changeMovies(movies, tmdb) {
  elements.film_list.innerHTML = movies.map(movie => {
    return `
    <div class="movie">
      <img class="movie_image" src="https://image.tmdb.org/t/p/w342/${movie.poster_path}.jpg" alt=""/>
      <p class="movie_title">${movie.title}</p>
    </div>`;
  }).join('');
  generatePagination(tmdb);
}

async function generatePagination(tmdb) {
  const currentPage = tmdb.page;
  const total_pages = tmdb.total_pages;
  const buttons = [];

  let startPage = 1;
  if (currentPage >= 5 && total_pages > 9) {
    startPage = Math.max(currentPage - 4, 1);
  }

  const endPage = Math.min(startPage + 8, total_pages);

  for (let i = startPage; i <= endPage; i++) {
    buttons.push(`
      <input type="button" 
        class="${i === currentPage ? 'active' : ''}" 
        data-pageNbr="${i}" 
        value="${i}"/>
    `);
  }

  elements.pagination.innerHTML = buttons.join('');
  generatePaginationListeners(tmdb);
}

async function generatePaginationListeners(tmdb) {
  const paginationElements = document.querySelectorAll(".pagination input");
  paginationElements.forEach(elem => {
    elem.addEventListener('click', async (e) => {
      if (elements.search_input.value) {
        const list = await tmdb.searchMovies(elements.search_input.value, e.currentTarget.dataset.pagenbr);
        changeMovies(list, tmdb);
      } else {
        const list = await tmdb.discoverMovies(e.currentTarget.dataset.pagenbr);
        changeMovies(list, tmdb);
      }
    })
  })
}