const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function tmdbFetch(
  endpoint: string,
  params: Record<string, string> = {}
) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.set("api_key", API_KEY || "");

  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value)
  );

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`TMDB fetch failed: ${res.statusText}`);
  }

  return res.json();
}

export async function fetchTrendingMovies() {
  const data = await tmdbFetch("/trending/movie/week");
  return data.results;
}

export async function fetchUpcomingMovies() {
  const data = await tmdbFetch("/movie/upcoming", {
    language: "en-US",
    page: "1",
  });
  return data.results;
}

export async function fetchNowPlayingMovies() {
  const data = await tmdbFetch("/movie/now_playing", {
    language: "en-US",
    page: "1",
  });
  return data.results;
}

export async function fetchTopRatedMovies() {
  const data = await tmdbFetch("/movie/top_rated", {
    language: "en-US",
    page: "1",
  });
  return data.results;
}

export async function getMovieDetails(id: string) {
  return tmdbFetch(`/movie/${id}`, { language: "en-US" });
}

export async function fetchMovieTrailer(id: string) {
  const data = await tmdbFetch(`/movie/${id}/videos`, { language: "en-US" });
  return data.results.find(
    (video: { site: string; type: string }) =>
      video.type === "Trailer" && video.site === "YouTube"
  );
}

export async function fetchTrendingTvShows() {
  const data = await tmdbFetch("/trending/tv/week");
  return data.results;
}

export async function fetchPopularTvShows() {
  const data = await tmdbFetch("/tv/popular", { language: "en-US", page: "1" });
  return data.results;
}

export async function fetchAiringTodayTvShows() {
  const data = await tmdbFetch("/tv/airing_today", {
    language: "en-US",
    page: "1",
  });
  return data.results;
}

export async function fetchOnTheAirTvShows() {
  const data = await tmdbFetch("/tv/on_the_air", {
    language: "en-US",
    page: "1",
  });
  return data.results;
}

export async function fetchTopRatedTvShows() {
  const data = await tmdbFetch("/tv/top_rated", {
    language: "en-US",
    page: "1",
  });
  return data.results;
}

export async function getTvShowDetails(id: string) {
  return tmdbFetch(`/tv/${id}`, { language: "en-US" });
}

export async function fetchTvShowTrailer(id: string) {
  const data = await tmdbFetch(`/tv/${id}/videos`, { language: "en-US" });
  return data.results.find(
    (video: { site: string; type: string }) =>
      video.type === "Trailer" && video.site === "YouTube"
  );
}

export const searchMovies = async (type: string, query: string) => {
  if (!query) return [];
  const res = await fetch(
    `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&language=en-US&page=1&include_adult=false`
  );
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  return data.results;
};

export async function getTvShowDetailsSeasons(tvId: string | number) {
  try {
    return tmdbFetch(`/tv/${tvId}`, { language: "en-US" });
  } catch (error) {
    console.error("Failed to fetch TV show details:", error);
    return null;
  }
}

export async function getTvSeasonEpisodes(
  tvId: string | number,
  seasonNumber: number
) {
  try {
    const data = await tmdbFetch(`/tv/${tvId}/season/${seasonNumber}`, {
      language: "en-US",
    });
    return data.episodes;
  } catch (error) {
    console.error("Failed to fetch season episodes:", error);
    return [];
  }
}
