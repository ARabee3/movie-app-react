import { useQuery } from "@tanstack/react-query";
import { useLocation, useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Pagination from "@mui/material/Pagination";
import MovieGrid from "../Components/Movies/MovieGrid";
import FilterBar from "../Components/common/FilterBar";
import { useMovieCategory } from "../hooks/useMovieCategory";
import { fetchGenres } from "../api/movieApi";

const CATEGORIES = [
  { value: "popular", label: "Popular" },
  { value: "now_playing", label: "Now Playing" },
  { value: "top_rated", label: "Top Rated" },
  { value: "upcoming", label: "Upcoming" },
];

function parseFilters(params) {
  const filters = {};
  const sort = params.get("sort");
  if (sort) filters.sort_by = sort;
  const genres = params.get("genres");
  if (genres) filters.with_genres = genres;
  const rating = params.get("rating");
  if (rating) filters.vote_average_gte = rating;
  const lang = params.get("lang");
  if (lang) filters.with_original_language = lang;
  return filters;
}

function filtersToParams(filters) {
  const p = new URLSearchParams();
  if (filters.sort_by) p.set("sort", filters.sort_by);
  if (filters.with_genres) p.set("genres", filters.with_genres);
  if (filters.vote_average_gte) p.set("rating", filters.vote_average_gte);
  if (filters.with_original_language) p.set("lang", filters.with_original_language);
  return p;
}

function findClosestTab(value) {
  const valid = CATEGORIES.map((c) => c.value);
  return valid.includes(value) ? value : "popular";
}

function MoviesPage() {
  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);
  const category = findClosestTab(params.get("category"));
  const page = parseInt(params.get("page"), 10) || 1;
  const filters = parseFilters(params);
  const hasFilters = Object.keys(filters).length > 0;

  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const { movies, totalPages, isLoading, error } = useMovieCategory({
    category,
    page,
    filters,
  });

  function updateUrl(updates) {
    const newParams = new URLSearchParams();
    const nextCategory = updates.category ?? category;
    const nextPage = updates.page ?? 1;
    const nextFilters = updates.filters ?? filters;

    newParams.set("category", nextCategory);
    if (nextPage > 1) newParams.set("page", nextPage);

    const filterParams = filtersToParams(nextFilters);
    for (const [k, v] of filterParams) newParams.set(k, v);

    const search = newParams.toString();
    history.replace({ search: search ? `?${search}` : "" });
  }

  function handleTabChange(_, value) {
    updateUrl({ category: value, page: 1, filters: {} });
  }

  function handleFilterChange(newFilters) {
    updateUrl({ filters: newFilters, page: 1 });
  }

  function handlePageChange(_, value) {
    updateUrl({ page: value });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Box sx={{ pb: 8 }}>
      <Box
        sx={{
          pt: { xs: 4, md: 6 },
          pb: { xs: 2, md: 3 },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3.5rem" },
            mb: 1,
          }}
        >
          Browse Movies
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: 3, fontSize: { xs: "0.85rem", md: "1.1rem" } }}
        >
          Explore our collection by category, genre, rating, and more
        </Typography>
      </Box>

      <Container maxWidth="xl">
        <Tabs
          value={category}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3, "& .MuiTab-root": { textTransform: "none", fontSize: "1rem", fontWeight: 600 } }}
        >
          {CATEGORIES.map((c) => (
            <Tab key={c.value} value={c.value} label={c.label} />
          ))}
        </Tabs>

        <Box sx={{ mb: 3 }}>
          <FilterBar genres={genres || []} filters={filters} onFilterChange={handleFilterChange} />
        </Box>

        {hasFilters && (
          <Typography sx={{ mb: 2, color: "text.secondary", fontSize: "0.9rem" }}>
            Showing filtered results
          </Typography>
        )}

        <MovieGrid movies={movies} isLoading={isLoading} error={error} />

        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
            <Pagination
              count={totalPages > 500 ? 500 : totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default MoviesPage;
