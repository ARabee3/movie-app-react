import axios from "axios";

const BASE = import.meta.env.VITE_TMDB_API_BASE;
const KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMG_BASE = import.meta.env.VITE_TMDB_IMG_BASE;
const BACKDROP_BASE = import.meta.env.VITE_TMDB_IMG_BACKDROP_BASE;

export async function fetchPopularMovies(page = 1) {
  const res = await axios.get(
    `${BASE}/movie/popular?api_key=${KEY}&page=${page}`,
  );
  return { movies: res.data.results, totalPages: res.data.total_pages };
}

export async function fetchGenres() {
  const res = await axios.get(`${BASE}/genre/movie/list?api_key=${KEY}`);
  return res.data.genres;
}

export async function fetchMovieDetails(id, lang = "en-US") {
  const res = await axios.get(
    `${BASE}/movie/${id}?api_key=${KEY}&language=${lang}`,
  );
  return res.data;
}

export async function fetchCredits(id, lang = "en-US") {
  const res = await axios.get(
    `${BASE}/movie/${id}/credits?api_key=${KEY}&language=${lang}`,
  );
  return res.data;
}

export async function fetchSearchMovies(query, page = 1) {
  const res = await axios.get(
    `${BASE}/search/movie?api_key=${KEY}&query=${encodeURIComponent(query)}&page=${page}`,
  );
  return { movies: res.data.results, totalPages: res.data.total_pages };
}

export async function fetchNowPlaying(page = 1) {
  const res = await axios.get(
    `${BASE}/movie/now_playing?api_key=${KEY}&page=${page}`,
  );
  return { movies: res.data.results, totalPages: res.data.total_pages };
}

export async function fetchTopRated(page = 1) {
  const res = await axios.get(
    `${BASE}/movie/top_rated?api_key=${KEY}&page=${page}`,
  );
  return { movies: res.data.results, totalPages: res.data.total_pages };
}

export async function fetchUpcoming(page = 1) {
  const res = await axios.get(
    `${BASE}/movie/upcoming?api_key=${KEY}&page=${page}`,
  );
  return { movies: res.data.results, totalPages: res.data.total_pages };
}

export async function fetchDiscoverMovies(filters = {}, page = 1) {
  const params = new URLSearchParams({ api_key: KEY, page });
  if (filters.sort_by) params.set("sort_by", filters.sort_by);
  if (filters.with_genres) params.set("with_genres", filters.with_genres);
  if (filters.vote_average_gte) params.set("vote_average.gte", filters.vote_average_gte);
  if (filters.with_original_language) params.set("with_original_language", filters.with_original_language);
  const res = await axios.get(`${BASE}/discover/movie?${params.toString()}`);
  return { movies: res.data.results, totalPages: res.data.total_pages };
}

export function buildPosterUrl(path) {
  return path ? `${IMG_BASE}${path}` : "";
}

export function buildBackdropUrl(path) {
  return path ? `${BACKDROP_BASE}${path}` : "";
}

export function buildProfileUrl(path) {
  return path ? `${IMG_BASE}${path}` : "";
}
