const API_KEY = 'b2676e3dfe0b9b9d794b8fe3233110fc';
const limit = 5;

document.addEventListener('DOMContentLoaded', () => {
  const szukajG = document.getElementById('szukajG');
  const szukaj = document.getElementById('szukaj');
  const wyborGatunku = document.getElementById('wyborGatunku');
  const moviesContainer2 = document.getElementById('moviesContainer2');
  szukajG.addEventListener('click', () => {
    const query = szukaj.value;
    const selectedGenre = wyborGatunku.value; 
    szukajFilm(query, selectedGenre);
  });

  const szukajFilm = (query, genre) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    if (genre) {
      url += `&with_genres=${genre}`;
    }
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Błąd sieciowy.');
      })
      .then(data => {
        wyswietlFilm(data.results);
      })
      .catch(error => {
        console.error('Wystąpił problem podczas pobierania szczegółów filmu:', error);
      });
  };

  const wyswietlFilm = (movies) => {
    moviesContainer2.innerHTML = '';
    movies.forEach(movie => {
      if (movie.poster_path) {
        const filmLink = document.createElement('a');
        filmLink.href = `index2.html?id=${movie.id}`;
        filmLink.setAttribute('target', '');
        filmLink.classList.add('movie');
        const plakatF = document.createElement('img');
        plakatF.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        plakatF.alt = movie.title;
        filmLink.appendChild(plakatF);
        moviesContainer2.appendChild(filmLink);
      }
    });
  };
});
// -----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const moviesContainer = document.getElementById('moviesContainer');
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Błąd sieciowy.');
    })
    .then(data => {
      wyswietlPopularneFilmy(data.results);
    })
    .catch(error => {
      console.error('Wystąpił problem podczas pobierania szczegółów filmu:', error);
    });

  const wyswietlPopularneFilmy = (movies) => {
    movies.slice(0, limit).forEach(movie => {
      if (movie.poster_path) {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-poster');
        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const title = movie.title;
        movieElement.innerHTML = `
          <a href="index2.html?id=${movie.id}" class="movie-link">
            <img src="${imageUrl}" alt="${title}" data-movie-id="${movie.id}"></a>`;
        moviesContainer.appendChild(movieElement);
      }
    });
  };
});
//------------------------------------------------------------
const sortowanie = document.getElementById('sortowanie'); 
sortowanie.addEventListener('change', () => {
  const wybranySort = sortowanie.value;
  if (wybranySort === 'release_date') {

    const movies = Array.from(moviesContainer2.querySelectorAll('.movie'));
    movies.sort((a, b) => {
      const movieAYear = parseInt(a.dataset.releaseYear);
      const movieBYear = parseInt(b.dataset.releaseYear);
      return movieBYear - movieAYear;
    });
    moviesContainer2.innerHTML = '';
    movies.forEach(movie => {
      moviesContainer2.appendChild(movie);
    });
  }
});

const wyswietlFilm = (movies) => {
  moviesContainer2.innerHTML = 'moviesContainer2';

  movies.forEach(movie => {
    if (movie.poster_path) {
      const filmLink = document.createElement('a');
      filmLink.href = `index.html?id=${movie.id}`;
      filmLink.setAttribute('target', '');
      filmLink.classList.add('movie');
      filmLink.dataset.releaseYear = movie.release_date.slice(0, 4); 

      const plakatF = document.createElement('img');
      plakatF.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      plakatF.alt = movie.title;

      filmLink.appendChild(plakatF);
      moviesContainer2.appendChild(filmLink);
    }
  });
};
