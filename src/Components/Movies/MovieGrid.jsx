import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";

function MovieGrid({ movies = [], isLoading, error }) {
  if (error)
    return (
      <ErrorMessage message="Failed to load movies. Please try again later." />
    );

  if (!isLoading && movies.length === 0) {
    return <EmptyState message="No movies found" />;
  }

  // Create an array of 12 items for the skeleton state
  const skeletonArray = Array.from({ length: 12 }, (_, i) => i);

  return (
    <Grid container spacing={3}>
      {isLoading
        ? skeletonArray.map((i) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={`skeleton-${i}`}>
              <MovieCard loading={true} />
            </Grid>
          ))
        : movies.map((movie) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
    </Grid>
  );
}

export default MovieGrid;
