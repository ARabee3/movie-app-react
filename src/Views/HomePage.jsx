import { useMemo } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Pagination,
} from "@mui/material";
import MovieGrid from "../Components/Movies/MovieGrid";
import MovieCarousel from "../Components/Movies/MovieCarousel";
import HeroSection from "../Components/Movies/HeroSection";
import { useMovieList } from "../hooks/useMovieList";
import { useMovieCategory } from "../hooks/useMovieCategory";

function HomePage() {
  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);
  const queryFromUrl = params.get("q") || "";
  const pageFromUrl = parseInt(params.get("page"), 10) || 1;

  const { movies: searchMovies, totalPages, isLoading: searchLoading, error: searchError } = useMovieList({
    searchQuery: queryFromUrl,
    page: pageFromUrl,
  });

  const popular = useMovieCategory({ category: "popular" });
  const topRated = useMovieCategory({ category: "top_rated" });
  const upcoming = useMovieCategory({ category: "upcoming" });

  const featuredMovie = useMemo(() => {
    return popular.movies && popular.movies.length > 0 ? popular.movies[0] : null;
  }, [popular.movies]);

  function updateUrl(q, p) {
    const newParams = new URLSearchParams();
    if (q) newParams.set("q", q);
    if (p > 1) newParams.set("page", p);
    const search = newParams.toString();
    history.replace({ search: search ? `?${search}` : "" });
  }

  function handlePageChange(_, value) {
    updateUrl(queryFromUrl, value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isSearching = !!queryFromUrl;

  return (
    <Box sx={{ pb: 8, bgcolor: "background.default", minHeight: "100vh" }}>
      {!isSearching ? (
        <Box>
          <HeroSection movie={featuredMovie} isLoading={popular.isLoading} />
          <Container maxWidth="xl" sx={{ mt: -8, position: "relative", zIndex: 3 }}>
            <MovieCarousel title="Trending Now" movies={popular.movies} isLoading={popular.isLoading} />
            <MovieCarousel title="Top Rated" movies={topRated.movies} isLoading={topRated.isLoading} />
            <MovieCarousel title="Upcoming Releases" movies={upcoming.movies} isLoading={upcoming.isLoading} />
          </Container>
        </Box>
      ) : (
        <Box sx={{ pt: { xs: 12, md: 16 } }}>
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 800 }}>
              Results for "{queryFromUrl}"
            </Typography>
            <MovieGrid movies={searchMovies} isLoading={searchLoading} error={searchError} />

            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <Pagination
                  count={totalPages > 500 ? 500 : totalPages}
                  page={pageFromUrl}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      borderRadius: 2,
                      fontWeight: 600
                    }
                  }}
                />
              </Box>
            )}
          </Container>
        </Box>
      )}
    </Box>
  );
}

export default HomePage;
