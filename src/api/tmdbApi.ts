const API_KEY = "f975b4f5e10040b0ed800db3826ac8bc";
const TMDB_BASE = "https://api.themoviedb.org/3";

export const URLS = {
  TRENDING_MOVIE: `${TMDB_BASE}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`,
  POPULAR_MOVIE: `${TMDB_BASE}/movie/popular?api_key=${API_KEY}&language=pt-BR`,
  TOP_RATED_MOVIE: `${TMDB_BASE}/movie/top_rated?api_key=${API_KEY}&language=pt-BR`,
  TRENDING_TV: `${TMDB_BASE}/trending/tv/week?api_key=${API_KEY}&language=pt-BR`,
  POPULAR_TV: `${TMDB_BASE}/tv/popular?api_key=${API_KEY}&language=pt-BR`,
  TOP_RATED_TV: `${TMDB_BASE}/tv/top_rated?api_key=${API_KEY}&language=pt-BR`,
  SEARCH: `${TMDB_BASE}/search/multi?api_key=${API_KEY}&language=pt-BR`,
};

export const fetchMovieDetails = async (id: number) => {
  try {
    const res = await fetch(
      `${TMDB_BASE}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    );
    if (!res.ok) throw new Error("Failed to fetch movie details");
    return res.json();
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    return null;
  }
};

export const fetchTvDetails = async (id: number) => {
  try {
    const res = await fetch(
      `${TMDB_BASE}/tv/${id}?api_key=${API_KEY}&language=pt-BR`
    );
    if (!res.ok) throw new Error("Failed to fetch TV show details");
    return res.json();
  } catch (error) {
    console.error(`Error fetching TV show details for ID ${id}:`, error);
    return null;
  }
};