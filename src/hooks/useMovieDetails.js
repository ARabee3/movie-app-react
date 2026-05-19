import { useQuery } from "@tanstack/react-query";
import {
  buildBackdropUrl,
  buildPosterUrl,
  buildProfileUrl,
  fetchCredits,
  fetchMovieDetails,
} from "../api/movieApi";

export function useMovieDetails(id, lang = "en-US") {
  const creditsQuery = useQuery({
    queryKey: ["movie", id, "credits", lang],
    queryFn: () => fetchCredits(id, lang),
    staleTime: 60 * 60 * 1000,
  });

  return useQuery({
    queryKey: ["movie", id, lang],
    queryFn: () => fetchMovieDetails(id, lang),
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
