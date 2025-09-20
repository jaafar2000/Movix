export const fetchTrending = async () => {
  console.log("Fetching started.... ");
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjAyODZlODBiM2NiMmNlMzljNTFiNTYxYzQ5YzkwNiIsIm5iZiI6MTY2NjUxMDY5MS43NjgsInN1YiI6IjYzNTRlZjYzZDhlMjI1MDA3ZDk5NmM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7xG_B9ZRXVzInEwnmMaZw1R_aV-37M154NWMYnqyDPk",
    },
  };

  const data = await fetch(url, options);
  const trending = await data.json();
  console.log("Fetching End .... ");
  console.log(trending);
  return trending;
};

export const fetchTrendingTv = async () => {
  const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjAyODZlODBiM2NiMmNlMzljNTFiNTYxYzQ5YzkwNiIsIm5iZiI6MTY2NjUxMDY5MS43NjgsInN1YiI6IjYzNTRlZjYzZDhlMjI1MDA3ZDk5NmM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7xG_B9ZRXVzInEwnmMaZw1R_aV-37M154NWMYnqyDPk",
    },
  };

  const data = await fetch(url, options);
  const trending = await data.json();
  console.log(trending);
  return trending;
};

export const FetchTopMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjAyODZlODBiM2NiMmNlMzljNTFiNTYxYzQ5YzkwNiIsIm5iZiI6MTY2NjUxMDY5MS43NjgsInN1YiI6IjYzNTRlZjYzZDhlMjI1MDA3ZDk5NmM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7xG_B9ZRXVzInEwnmMaZw1R_aV-37M154NWMYnqyDPk",
    },
  };

  const data = await fetch(url, options);
  const trending = await data.json();
  console.log(trending);
  return trending;
};

export const FetchUpcomings = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjAyODZlODBiM2NiMmNlMzljNTFiNTYxYzQ5YzkwNiIsIm5iZiI6MTY2NjUxMDY5MS43NjgsInN1YiI6IjYzNTRlZjYzZDhlMjI1MDA3ZDk5NmM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7xG_B9ZRXVzInEwnmMaZw1R_aV-37M154NWMYnqyDPk",
    },
  };

  const data = await fetch(url, options);
  const trending = await data.json();
  console.log(trending);
  return trending;
};

export const FetchNowPlaying = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjAyODZlODBiM2NiMmNlMzljNTFiNTYxYzQ5YzkwNiIsIm5iZiI6MTY2NjUxMDY5MS43NjgsInN1YiI6IjYzNTRlZjYzZDhlMjI1MDA3ZDk5NmM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7xG_B9ZRXVzInEwnmMaZw1R_aV-37M154NWMYnqyDPk",
    },
  };

  const data = await fetch(url, options);
  const trending = await data.json();
  console.log(trending);
  return trending;
};
