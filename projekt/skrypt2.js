const klucz_API = 'b2676e3dfe0b9b9d794b8fe3233110fc';

document.addEventListener('DOMContentLoaded', () => {
	const urlParams = new URLSearchParams(window.location.search);
	const movieId = urlParams.get('id');

	fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${klucz_API}`)
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error('Błąd sieciowy.');
		})
		.then(movieDetails => {
			wyswietlSzegoly(movieDetails);
		})
		.catch(error => {
			console.error('Wystąpił problem podczas pobierania szczegółów filmu:', error);
		});

	const wyswietlSzegoly = (movie) => {
		document.getElementById('Tytul').innerText = movie.title;
		document.getElementById('dataWydania').innerText = movie.release_date;

		
		const gatunki = movie.genres.map(gatunek => gatunek.name).join(', ');
		document.getElementById('gatunek').innerText = gatunki;

		
		
		document.getElementById('rezyser').innerText = 'Nie dostępne';

		
		document.getElementById('aktorzy').innerText = 'Nie dostępne';

		document.getElementById('opis').innerText = movie.overview;
		document.getElementById('sredniaOcen').innerText = movie.vote_average;

		
		const ścieżkaDoPlakatu = movie.poster_path;
		const elementPlakatu = document.getElementById('moviePoster');
		if (ścieżkaDoPlakatu) {
			elementPlakatu.src = `https://image.tmdb.org/t/p/w500/${ścieżkaDoPlakatu}`;
		}
		else {
			elementPlakatu.style.display = 'none'; 
		}

	
		const linkTMDB = document.getElementById('tmdbLink');
		linkTMDB.href = `https://www.themoviedb.org/movie/${movie.id}`;

		
		const zwiastunLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title)}+official+trailer`;
		const trailerElement = document.getElementById('trailer');
		trailerElement.innerHTML = `<a href="${zwiastunLink}" target="">Zobacz zwiastun na YouTube</a>`;
	};
	const powtierdzOcene = () => {
		const rating = parseFloat(document.getElementById('suwak').value);

		
		if (rating >= 0 && rating <= 10) {
			localStorage.setItem(`movie_${movieId}_rating`, rating);
			console.log('Ocena została zapisana lokalnie.');
			
		}
		else {
			console.error('Ocena musi być w zakresie od 0 do 10.');
		}
	};

	document.getElementById('potwierdz').addEventListener('click', powtierdzOcene);

	
	const storedRating = localStorage.getItem(`movie_${movieId}_rating`);
	if (storedRating) {
		document.getElementById('suwak').value = storedRating;
	}
});
