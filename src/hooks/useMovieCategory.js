import { useQuery } from "@tanstack/react-query";
import {
  fetchPopularMovies,
  fetchNowPlaying,
  fetchTopRated,
  fetchUpcoming,
  fetchDiscoverMovies,
  fetchGenres,
} from "../api/movieApi";
import { mapMoviesWithGenres } from "../utils/movieUtils";

const CATEGORY_API = {
  popular: fetchPopularMovies,
  now_playing: fetchNowPlaying,
  top_rated: fetchTopRated,
  upcoming: fetchUpcoming,
};

export function useMovieCategory({ category = "popular", page = 1, filters = {} } = {}) {
  const genresQuery = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const hasFilters = filters.sort_by || filters.with_genres || filters.vote_average_gte || filters.with_original_language;

  const queryFn = hasFilters
    ? () => fetchDiscoverMovies(filters, page)
    : () => CATEGORY_API[category]?.(page) ?? fetchPopularMovies(page);

  const queryKey = hasFilters
    ? ["movies", "discover", filters, page]
    : ["movies", category, page];

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
