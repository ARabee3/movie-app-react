import { useQuery } from "@tanstack/react-query";
import {
  fetchPopularMovies,
  fetchSearchMovies,
  fetchGenres,
  buildPosterUrl,
} from "../api/movieApi";

export function useMovieList({ searchQuery = "", page = 1 } = {}) {
  const genresQuery = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const queryFn = searchQuery
    ? () => fetchSearchMovies(searchQuery, page)
    : () => fetchPopularMovies(page);

  const queryKey = searchQuery
    ? ["movies", "search", searchQuery, page]
    : ["movies", "popular", page];

  const query = useQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000,
    select: (data) => {
      const genres = genresQuery.data || [];
      const genreMap = Object.fromEntries(genres.map((g) => [g.id, g.name]));

      const mappedMovies = data.movies.map((movie) => ({
        ...movie,
        poster: buildPosterUrl(movie.poster_path),
        genreNames: (movie.genre_ids || [])
          .map((id) => genreMap[id])
          .filter(Boolean),
      }));

      return { movies: mappedMovies, totalPages: data.totalPages };
    },
    enabled: !!genresQuery.data || genresQuery.isError,
  });

  return {
    movies: query.data?.movies ?? [],
    totalPages: query.data?.totalPages ?? 0,
    isLoading: query.isLoading,
    error: query.error,
  };
}
