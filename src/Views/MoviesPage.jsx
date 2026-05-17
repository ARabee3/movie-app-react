import { useQuery } from "@tanstack/react-query";
import { useLocation, useHistory } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Pagination,
  Stack,
  Divider,
} from "@mui/material";
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
    <Box sx={{ pb: 10, pt: { xs: 12, md: 16 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4, lg: 6 } }}>
        <Stack spacing={6}>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                mb: 1,
              }}
            >
              Explore Movies
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontSize: { xs: "0.9rem", md: "1.1rem" } }}
            >
              Discover the latest and greatest in cinema
            </Typography>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: "rgba(255,255,255,0.1)" }}>
            <Tabs
              value={category}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTabs-indicator": { height: 3, borderRadius: "3px 3px 0 0" },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 700,
                  minWidth: 100,
                  color: "text.secondary",
                  "&.Mui-selected": { color: "primary.main" }
                }
              }}
            >
              {CATEGORIES.map((c) => (
                <Tab key={c.value} value={c.value} label={c.label} />
              ))}
            </Tabs>
          </Box>

          <Box>
            <FilterBar genres={genres || []} filters={filters} onFilterChange={handleFilterChange} />
          </Box>

          <Divider sx={{ opacity: 0.1 }} />

          <Box>
            <MovieGrid movies={movies} isLoading={isLoading} error={error} />
          </Box>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
              <Pagination
                count={totalPages > 500 ? 500 : totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: 2,
                    fontWeight: 700,
                    bgcolor: "rgba(255,255,255,0.03)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                    "&.Mui-selected": { bgcolor: "primary.main" }
                  }
                }}
              />
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default MoviesPage;
