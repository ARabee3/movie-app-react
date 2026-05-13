import { useQuery } from "@tanstack/react-query";
import {
  fetchPopularMovies,
  fetchGenres,
  buildPosterUrl,
} from "../api/movieApi";

export function useMoviesWithGenres() {
  const genresQuery = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 24 * 60 * 60 * 1000,
  });

  return useQuery({
    queryKey: ["movies", "popular"],
    queryFn: fetchPopularMovies,
    staleTime: 5 * 60 * 1000,
    select: (movies) => {
      const genres = genresQuery.data || [];
      const genreMap = Object.fromEntries(genres.map((g) => [g.id, g.name]));

      return movies.map((movie) => ({
        ...movie,
        poster: buildPosterUrl(movie.poster_path),
        genreNames: (movie.genre_ids || [])
          .map((id) => genreMap[id])
          .filter(Boolean),
      }));
    },
    enabled: !!genresQuery.data || genresQuery.isError,
  });
}
