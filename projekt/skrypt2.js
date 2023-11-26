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
      wyświetlSzczegółyFilmu(movieDetails);
    })
    .catch(error => {
      console.error('Wystąpił problem podczas pobierania szczegółów filmu:', error);
    });

  const wyświetlSzczegółyFilmu = (film) => {
    document.getElementById('movieTitle').innerText = film.title;
    document.getElementById('releaseDate').innerText = film.release_date;
    
    // Gatunki
    const gatunki = film.genres.map(gatunek => gatunek.name).join(', ');
    document.getElementById('genres').innerText = gatunki;
    
    // Reżyser - tutaj może być konieczne inne API lub źródło danych, aby uzyskać informacje o reżyserze
    // Dla uproszczenia, załóżmy, że nie jest dostępne bezpośrednio i pozostawiamy to puste na razie
    document.getElementById('director').innerText = 'Nie dostępne';
    
    // Aktorzy - podobnie jak w przypadku reżysera, zakładamy, że nie są dostępni bezpośrednio
    document.getElementById('actors').innerText = 'Nie dostępne';

    document.getElementById('overview').innerText = film.overview;
    document.getElementById('averageRating').innerText = film.vote_average;

    // Plakat filmowy
    const ścieżkaDoPlakatu = film.poster_path;
    const elementPlakatu = document.getElementById('moviePoster');
    if (ścieżkaDoPlakatu) {
      elementPlakatu.src = `https://image.tmdb.org/t/p/w500/${ścieżkaDoPlakatu}`;
    } else {
      elementPlakatu.style.display = 'none'; // Ukryj plakat, jeśli niedostępny
    }

    // Link do TMDB
    const linkTMDB = document.getElementById('tmdbLink');
    linkTMDB.href = `https://www.themoviedb.org/movie/${film.id}`;

    // Zwiastun - zakładając, że link do zwiastuna nie jest dostępny w odpowiedzi
    // Może być konieczne pobranie go z innego API lub mieć osobne źródło
    // Na razie pozostawiamy to jako pusty iframe
    const elementZwiastuna = document.getElementById('trailer');
    elementZwiastuna.innerHTML = `<iframe width="100%" height="315" src="" frameborder="0" allowfullscreen></iframe>`;
  };
});