const API_KEY = 'b2676e3dfe0b9b9d794b8fe3233110fc';

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');
  const moviesContainer2 = document.getElementById('moviesContainer2');

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
    moviesContainer2.innerHTML = '';

    movies.forEach(movie => {
      if (movie.poster_path) {
        const movieLink = document.createElement('a');
        movieLink.classList.add('movie');
        movieLink.setAttribute('target', '_blank'); // Otwieranie linku w nowej karcie
        movieLink.href = `https://www.themoviedb.org/movie/${movie.id}`;

        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        moviePoster.alt = movie.title;

        movieLink.appendChild(moviePoster);
        moviesContainer2.appendChild(movieLink);
      }
    });
  }
});

// Oddzielam ----------------------------

const MAX_MOVIES_TO_DISPLAY = 5; // Maksymalna liczba wyświetlanych filmów

document.addEventListener('DOMContentLoaded', () => {
  const moviesContainer = document.getElementById('moviesContainer');

  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      displayPopularMovies(data.results);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });

  function displayPopularMovies(movies) {
    movies.slice(0, MAX_MOVIES_TO_DISPLAY).forEach(movie => {
      if (movie.poster_path) {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-poster');

        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const title = movie.title;
        const releaseDate = movie.release_date;

        movieElement.innerHTML = `
          <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">
            <img src="${imageUrl}" alt="${title}" data-movie-id="${movie.id}">
          </a>
          <p>${releaseDate}</p>
        `;

        moviesContainer.appendChild(movieElement);
      }
    });

    moviesContainer.addEventListener('click', (event) => {
      const moviePoster = event.target.closest('.movie-poster img');
      if (moviePoster) {
        const movieId = moviePoster.dataset.movieId;
        fetchMovieDetails(movieId);
      }
    });
  }

  function fetchMovieDetails(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(movieDetails => {
        console.log('Szczegóły filmu:', movieDetails);
      })
      .catch(error => {
        console.error('There has been a problem with fetching movie details:', error);
      });
  }
});
