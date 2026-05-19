import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import MovieCard from "./MovieCard";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";

function MovieGrid({ movies = [], isLoading, error }) {
  const { t } = useTranslation();

  if (error)
    return (
      <ErrorMessage message={t("common.error_movies")} />
    );

  if (!isLoading && movies.length === 0) {
    return <EmptyState message={t("common.empty_movies")} />;
  }

  const skeletonArray = Array.from({ length: 12 }, (_, i) => i);

  return (
    <Grid container spacing={3} sx={{ justifyContent: "center" }}>
      {isLoading
        ? skeletonArray.map((i) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={`skeleton-${i}`}>
              <MovieCard loading={true} />
            </Grid>
          ))
        : movies.map((movie) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
    </Grid>
  );
}

export default MovieGrid;
