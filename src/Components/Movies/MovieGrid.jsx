import Grid from "@mui/material/Grid";
import MovieCard from "./MovieCard";
import { useMoviesWithGenres } from "../../hooks/useMoviesWithGenres";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";

function MovieGrid({ searchQuery }) {
  const { data: movies, isLoading, error } = useMoviesWithGenres();

  const filtered = (movies || []).filter((m) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.genreNames.some((g) => g.toLowerCase().includes(q))
    );
  });

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <ErrorMessage message="Failed to load movies. Please try again later." />
    );

  return (
    <Grid container spacing={2} justifyContent="flex-start">
      {filtered.map((movie) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}

      {filtered.length === 0 && (
        <Grid item xs={12}>
          <EmptyState message="No movies found" />
        </Grid>
      )}
    </Grid>
  );
}

export default MovieGrid;
