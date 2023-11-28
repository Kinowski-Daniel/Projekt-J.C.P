const API_KEY = 'b2676e3dfe0b9b9d794b8fe3233110fc';
const MAX_MOVIES_TO_DISPLAY = 5;

document.addEventListener('DOMContentLoaded', () => {
	const searchButton = document.getElementById('searchButton');
	const searchInput = document.getElementById('searchInput');
	const genreSelect = document.getElementById('genreSelect');
	const moviesContainer2 = document.getElementById('moviesContainer2');

	searchButton.addEventListener('click', () => {
		const query = searchInput.value;
		const selectedGenre = genreSelect.value; //Pobiera gatunek 
		searchMovie(query, selectedGenre);
	});


	const searchMovie = (query, genre) => {
		let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

		if (genre) {
			url += `&with_genres=${genre}`; 
		}

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
				movieLink.href = `index2.html?id=${movie.id}`;
				movieLink.setAttribute('target', '');
				movieLink.classList.add('movie');

				const moviePoster = document.createElement('img');
				moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
				moviePoster.alt = movie.title;

				movieLink.appendChild(moviePoster);
				moviesContainer2.appendChild(movieLink);
			}
		});
	};
});

// Kod dla popularnych filmów

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

	const displayPopularMovies = (movies) => {
		movies.slice(0, MAX_MOVIES_TO_DISPLAY).forEach(movie => {
			if (movie.poster_path) {
				const movieElement = document.createElement('div');
				movieElement.classList.add('movie-poster');

				const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
				const title = movie.title;

				movieElement.innerHTML = `
          <a href="index2.html?id=${movie.id}" class="movie-link">
            <img src="${imageUrl}" alt="${title}" data-movie-id="${movie.id}">
          </a>
          
        `;

				moviesContainer.appendChild(movieElement);
			}
		});
	};
});

// Kod Do Sortowania
const sortSelect = document.getElementById('sortSelect'); //Rozwijane menu z opcjami sortowania
sortSelect.addEventListener('change', () => {
	const selectedSortOption = sortSelect.value;
	if (selectedSortOption === 'release_date') {
		// Sortowanie filmów po roku wydania
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

const displayMovies = (movies) => {
	moviesContainer2.innerHTML = 'moviesContainer2';

	movies.forEach(movie => {
		if (movie.poster_path) {
			const movieLink = document.createElement('a');
			movieLink.href = `index.html?id=${movie.id}`;
			movieLink.setAttribute('target', '');
			movieLink.classList.add('movie');
			movieLink.dataset.releaseYear = movie.release_date.slice(0, 4); // Dodanie roku wydania do dataset

			const moviePoster = document.createElement('img');
			moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
			moviePoster.alt = movie.title;

			movieLink.appendChild(moviePoster);
			moviesContainer2.appendChild(movieLink);
		}
	});
};
