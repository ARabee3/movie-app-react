import { useQuery } from "@tanstack/react-query";
import {
  fetchPopularMovies,
  fetchNowPlaying,
  fetchTopRated,
  fetchUpcoming,
  fetchDiscoverMovies,
  fetchGenres,
  buildPosterUrl,
} from "../api/movieApi";

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
