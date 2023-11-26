const API_KEY = 'b2676e3dfe0b9b9d794b8fe3233110fc';

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');
  const moviesContainer2 = document.getElementById('moviesContainer2');

  searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    searchMovie(query);
  });

  const searchMovie = (query) => {
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
  };

  const displayMovies = (movies) => {
    moviesContainer2.innerHTML = '';

    movies.forEach(movie => {
      if (movie.poster_path) {
        const movieLink = document.createElement('a');
        movieLink.classList.add('movie');
        movieLink.setAttribute('target', ''); // Otwieranie linku w nowej karcie
        movieLink.href = `https://www.themoviedb.org/movie/${movie.id}`;

        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        moviePoster.alt = movie.title;

        movieLink.appendChild(moviePoster);
        moviesContainer2.appendChild(movieLink);
      }
    });
  };
});

// Oddzielam ----------------------------

// Stała definiująca maksymalną liczbę wyświetlanych filmów
const MAX_MOVIES_TO_DISPLAY = 5; 

// Wywołanie funkcji po załadowaniu struktury DOM
document.addEventListener('DOMContentLoaded', () => {
  // Pobranie referencji do kontenera na filmy
  const moviesContainer = document.getElementById('moviesContainer');

  // Pobranie popularnych filmów za pomocą API klucza
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    .then(response => {
      // Sprawdzenie, czy odpowiedź sieciowa jest prawidłowa
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      // Wywołanie funkcji wyświetlającej popularne filmy
      displayPopularMovies(data.results);
      
    })
    .catch(error => {
      // Obsługa błędów w przypadku problemu z pobieraniem danych
      console.error('There has been a problem with your fetch operation:', error);
    });

  // Funkcja wyświetlająca popularne filmy
  const displayPopularMovies = (movies) => {
    // Iteracja po pierwszych MAX_MOVIES_TO_DISPLAY filmach
    movies.slice(0, MAX_MOVIES_TO_DISPLAY).forEach(movie => {
      if (movie.poster_path) {
        // Tworzenie elementu div dla każdego filmu
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-poster');

        // Konstruowanie ścieżki do obrazu filmowego
        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const title = movie.title;
        const releaseDate = movie.release_date;

        // Wstawienie treści do elementu filmu
        movieElement.innerHTML = `
          <a href="https://www.themoviedb.org/movie/${movie.id}" target="">
            <img src="${imageUrl}" alt="${title}" data-movie-id="${movie.id}">
          </a>
          <p>${releaseDate}</p>
        `;

        // Dodanie elementu filmu do kontenera
        moviesContainer.appendChild(movieElement);
      }
    });

    // Dodanie nasłuchiwacza zdarzeń na kontenerze filmów
    moviesContainer.addEventListener('click', (event) => {
      // Sprawdzenie, czy kliknięto na obraz filmu
      const moviePoster = event.target.closest('.movie-poster img');
      if (moviePoster) {
        // Pobranie identyfikatora filmu i pobranie jego szczegółów
        const movieId = moviePoster.dataset.movieId;
        fetchMovieDetails(movieId);
      }
    });
  };

  // Funkcja pobierająca szczegóły filmu za pomocą identyfikatora
  const fetchMovieDetails = (movieId) => {
    // Pobranie szczegółów filmu za pomocą API klucza
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then(response => {
        // Sprawdzenie, czy odpowiedź sieciowa jest prawidłowa
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(movieDetails => {
        // Wyświetlenie szczegółów filmu w konsoli
        console.log('Szczegóły filmu:', movieDetails);
      })
      .catch(error => {
        // Obsługa błędów w przypadku problemu z pobieraniem szczegółów filmu
        console.error('There has been a problem with fetching movie details:', error);
      });
  };
});
