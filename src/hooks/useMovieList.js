import { useQuery } from "@tanstack/react-query";
import {
  fetchPopularMovies,
  fetchSearchMovies,
  fetchGenres,
} from "../api/movieApi";
import { mapMoviesWithGenres } from "../utils/movieUtils";

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
    select: (data) => ({
      movies: mapMoviesWithGenres(data.movies, genresQuery.data),
      totalPages: data.totalPages,
    }),
    enabled: !!genresQuery.data || genresQuery.isError,
  });

  return {
    movies: query.data?.movies ?? [],
    totalPages: query.data?.totalPages ?? 0,
    isLoading: query.isLoading,
    error: query.error,
  };
}
