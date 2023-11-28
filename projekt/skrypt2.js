const API_KEY = 'b2676e3dfe0b9b9d794b8fe3233110fc';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Błąd sieciowy.');
    })
    .then(movieDetails => {
      displayMovieDetails(movieDetails);
    })
    .catch(error => {
      console.error('Wystąpił problem podczas pobierania szczegółów filmu:', error);
    });

  const displayMovieDetails = (movie) => {
    document.getElementById('movieTitle').innerText = movie.title;
    document.getElementById('releaseDate').innerText = movie.release_date;
    
    // Gatunki
    const gatunki = movie.genres.map(gatunek => gatunek.name).join(', ');
    document.getElementById('genres').innerText = gatunki;
    
    // Reżyser - tutaj może być konieczne inne API lub źródło danych, aby uzyskać informacje o reżyserze
    // Dla uproszczenia, załóżmy, że nie jest dostępne bezpośrednio i pozostawiamy to puste na razie
    document.getElementById('director').innerText = 'Nie dostępne';
    
    // Aktorzy - podobnie jak w przypadku reżysera, zakładamy, że nie są dostępni bezpośrednio
    document.getElementById('actors').innerText = 'Nie dostępne';

    document.getElementById('overview').innerText = movie.overview;
    document.getElementById('averageRating').innerText = movie.vote_average;

    // Plakat filmowy
    const ścieżkaDoPlakatu = movie.poster_path;
    const elementPlakatu = document.getElementById('moviePoster');
    if (ścieżkaDoPlakatu) {
      elementPlakatu.src = `https://image.tmdb.org/t/p/w500/${ścieżkaDoPlakatu}`;
    } else {
      elementPlakatu.style.display = 'none'; // Ukryj plakat, jeśli niedostępny
    }

    // Link do TMDB
    const linkTMDB = document.getElementById('tmdbLink');
    linkTMDB.href = `https://www.themoviedb.org/movie/${movie.id}`;

    // Link do zwiastuna na YouTube
    const trailerLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title)}+official+trailer`;
    const trailerElement = document.getElementById('trailer');
    trailerElement.innerHTML = `<a href="${trailerLink}" target="">Zobacz zwiastun na YouTube</a>`;
  };
  const submitRatingg = () => {
    const rating = parseFloat(document.getElementById('ratingSlider').value);

    // Sprawdź, czy ocena mieści się w zakresie 0-10
    if (rating >= 0 && rating <= 10) {
      // Zapisz ocenę w localStorage
      localStorage.setItem(`movie_${movieId}_rating`, rating);
      console.log('Ocena została zapisana lokalnie.');
      // Możesz dodać tutaj aktualizację strony lub informację zwrotną dla użytkownika
    } else {
      console.error('Ocena musi być w zakresie od 0 do 10.');
    }
  };

  document.getElementById('submitRating').addEventListener('click', submitRatingg);

  // Pobierz ocenę z localStorage przy ładowaniu strony
  const storedRating = localStorage.getItem(`movie_${movieId}_rating`);
  if (storedRating) {
    document.getElementById('ratingSlider').value = storedRating;
  }
});

