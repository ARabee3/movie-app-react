import { buildPosterUrl } from "../api/movieApi";

export function mapMoviesWithGenres(movies, genres) {
  const genreMap = Object.fromEntries((genres || []).map((g) => [g.id, g.name]));
  return movies.map((movie) => ({
    ...movie,
    poster: buildPosterUrl(movie.poster_path),
    genreNames: (movie.genre_ids || [])
      .map((id) => genreMap[id])
      .filter(Boolean),
  }));
}
