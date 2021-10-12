let movie_id = location.pathname;

// fetch movie -data //

fetch(
  `${movie_api_http}${movie_id}?` +
    new URLSearchParams({
      api_key: api_key,
    })
)
  .then((res) => res.json())
  .then((data) => {
    setMovieInfo(data);
  });

const setMovieInfo = (data) => {
  const movieName = document.querySelector(".movie-name");
  const genres = document.querySelector(".genres");
  const dis = document.querySelector(".dis");
  const title = document.querySelector("title");
  const backDrop = document.querySelector(".movie-info");

  title.innerHTML = movieName.innerHTML = data.title;
  genres.innerHTML = `${data.release_date.split("-")[0]} | `;
  for (let i = 0; i < data.genres.length; i++) {
    genres.innerHTML += data.genres[i].name + format(i, data.genres.length);
  }
  if (data.adult == true) {
    genres.innerHTML += " | +18";
  }

  if (data.backDrop_path == null) {
    data.backDrop_path = data.poster_path;
  }
  dis.innerHTML = data.overview.substring(0, 200) + "....";

  backDrop.style.backgroundImage = `url(${original_img_url}${data.backDrop_path})`;
};

const format = (currentIndex, maxIndex) => {
  return currentIndex == maxIndex - 1 ? " " : ", ";
};

//Remaning-fetch-data//

fetch(
  `${movie_api_http}${movie_id}/credits?` +
    new URLSearchParams({
      api_key: api_key,
    })
)
  .then((res) => res.json())
  .then((data) => {
    const cast = document.querySelector(".starring");
    for (let i = 0; i < 5; i++) {
      cast.innerHTML += data.cast[i].name + format(i, 5);
    }
  });

// Video //

fetch(
  `${movie_api_http}${movie_id}/videos?` +
    new URLSearchParams({
      api_key: api_key,
    })
)
  .then((res) => res.json())
  .then((data) => {
    let trailerClip = document.querySelector(".trailer");
    let maxClip = data.results.length < 4 ? 4 : data.results.length;
    for (let i = 0; i < maxClip; i++) {
      trailerClip.innerHTML += `<iframe
        src="https://www.youtube.com/embed/${data.results[i].key}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>`;
    }
  });

// similar - movies //

fetch(
  `${movie_api_http}${movie_id}/recommendations?` +
    new URLSearchParams({
      api_key: api_key,
    })
)
  .then((res) => res.json())
  .then((data) => {
    let container = document.querySelector(".recommendations-list");
    for (let i = 0; i < 16; i++) {
      if (data.results[i].backDrop_path == null) {
        i++;
      }
      container.innerHTML += `<div class="movie" onclick="location.href= '/${data.results[i].id}'">
      <img src="${img_url}${data.results[i].backdrop_path}" alt="" />
      <p class="movie-title">${data.results[i].title}</p>
    </div>`;
    }
  });
