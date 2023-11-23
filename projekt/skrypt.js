const API_KEY = 'TWÓJ KLUCZ API Z The Movie Database';

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');
  const moviesContainer = document.getElementById('moviesContainer');

  searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    searchMovie(query);
  });

  function searchMovie(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        displayMovies(data.results);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  function displayMovies(movies) {
    moviesContainer.innerHTML = ''; // Wyczyszczenie kontenera przed nowym wynikiem wyszukiwania

    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');
      movieElement.innerHTML = `
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
        <hr>
      `;
      moviesContainer.appendChild(movieElement);
    });
  }
});
