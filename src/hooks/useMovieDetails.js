import { useQuery } from "@tanstack/react-query";
import {
  buildBackdropUrl,
  buildPosterUrl,
  buildProfileUrl,
  fetchCredits,
  fetchMovieDetails,
} from "../api/movieApi";

export function useMovieDetails(id) {
  const creditsQuery = useQuery({
    queryKey: ["movie", id, "credits"],
    queryFn: () => fetchCredits(id, "credits"),
    staleTime: 60 * 60 * 1000,
  });

  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!creditsQuery.data || creditsQuery.isError,
    staleTime: 60 * 60 * 1000,
    select: (movie) => ({
      ...movie,
      backdrop_path: buildBackdropUrl(movie.backdrop_path),
      poster_path: buildPosterUrl(movie.poster_path),
      cast: creditsQuery.data
        ? creditsQuery.data.cast.map((actor) => ({
            ...actor,
            profile_path: buildProfileUrl(actor.profile_path),
          }))
        : [],
    }),
  });
}
