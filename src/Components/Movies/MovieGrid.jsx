import Grid from "@mui/material/Grid";
import MovieCard from "./MovieCard";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";

function MovieGrid({ movies, isLoading, error }) {
  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <ErrorMessage message="Failed to load movies. Please try again later." />
    );

  return (
    <Grid container spacing={2} justifyContent="flex-start">
      {movies.map((movie) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}

      {movies.length === 0 && (
        <Grid item xs={12}>
          <EmptyState message="No movies found" />
        </Grid>
      )}
    </Grid>
  );
}

export default MovieGrid;
