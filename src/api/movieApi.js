import axios from "axios";

const BASE = import.meta.env.VITE_TMDB_API_BASE;
const KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMG_BASE = import.meta.env.VITE_TMDB_IMG_BASE;
const BACKDROP_BASE = import.meta.env.VITE_TMDB_IMG_BACKDROP_BASE;
export async function fetchPopularMovies() {
  const res = await axios.get(`${BASE}/movie/popular?api_key=${KEY}`);
  return res.data.results;
}

export async function fetchGenres() {
  const res = await axios.get(`${BASE}/genre/movie/list?api_key=${KEY}`);
  return res.data.genres;
}

export async function fetchMovieDetails(id) {
  const res = await axios.get(`${BASE}/movie/${id}?api_key=${KEY}`);
  return res.data;
}

export async function fetchCredits(id) {
  const res = await axios.get(`${BASE}/movie/${id}/credits?api_key=${KEY}`);
  return res.data;
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
