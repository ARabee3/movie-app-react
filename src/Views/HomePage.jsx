import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Pagination from "@mui/material/Pagination";
import HeroSection from "../Components/Movies/HeroSection";
import MovieCarousel from "../Components/Movies/MovieCarousel";
import MovieGrid from "../Components/Movies/MovieGrid";
import { useMovieList } from "../hooks/useMovieList";
import { useMovieCategory } from "../hooks/useMovieCategory";
import { useLanguage } from "../context/LanguageContext";

function HomePage() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);
  const queryFromUrl = params.get("q") || "";
  const pageFromUrl = parseInt(params.get("page"), 10) || 1;

  const isSearching = !!queryFromUrl;

  const [searchInput, setSearchInput] = useState(queryFromUrl);

  const language = lang === "ar" ? "ar-SA" : "en-US";

  const { movies: searchResults, totalPages, isLoading: searchLoading, error } = useMovieList({
    searchQuery: queryFromUrl,
    page: pageFromUrl,
  });

  const { movies: popularMovies, isLoading: popularLoading } = useMovieCategory({ category: "popular", page: 1 });
  const { movies: nowPlayingMovies, isLoading: nowPlayingLoading } = useMovieCategory({ category: "now_playing", page: 1 });
  const { movies: topRatedMovies, isLoading: topRatedLoading } = useMovieCategory({ category: "top_rated", page: 1 });
  const { movies: upcomingMovies, isLoading: upcomingLoading } = useMovieCategory({ category: "upcoming", page: 1 });

  const heroMovie = popularMovies.length > 0 ? popularMovies[0] : null;

  function updateUrl(q, p) {
    const newParams = new URLSearchParams();
    if (q) newParams.set("q", q);
    if (p > 1) newParams.set("page", p);
    const search = newParams.toString();
    history.replace({ search: search ? `?${search}` : "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateUrl(searchInput, 1);
  }

  function handleClear() {
    setSearchInput("");
    updateUrl("", 1);
  }

  function handlePageChange(_, value) {
    updateUrl(queryFromUrl, value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Box sx={{ pb: 8 }}>
      {isSearching ? (
        <Box
          sx={{
            pt: { xs: 14, md: 18 },
            pb: { xs: 4, md: 6 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3.5rem" },
              mb: 1,
              px: 2,
            }}
          >
            {t("homepage.title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 4,
              fontSize: { xs: "0.85rem", sm: "1rem", md: "1.1rem" },
              px: 4,
            }}
          >
            {t("homepage.subtitle")}
          </Typography>

          <Container maxWidth="sm" component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder={t("homepage.search_placeholder")}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton type="submit" size="small" sx={{ color: "text.secondary" }}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: searchInput ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={handleClear}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "background.paper",
                  borderRadius: 3,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
          </Container>
        </Box>
      ) : (
        <HeroSection movie={heroMovie} isLoading={popularLoading} />
      )}

      <Container maxWidth="xl" sx={{ mt: isSearching ? 0 : { xs: 4, md: 6 } }}>
        {isSearching ? (
          <>
            <Typography sx={{ mb: 2, color: "text.secondary" }}>
              {searchResults.length > 0
                ? t("homepage.results_for", { query: queryFromUrl })
                : t("homepage.no_results", { query: queryFromUrl })}
            </Typography>

            <MovieGrid movies={searchResults} isLoading={searchLoading} error={error} />

            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
                <Pagination
                  count={totalPages > 500 ? 500 : totalPages}
                  page={pageFromUrl}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  siblingCount={1}
                  boundaryCount={1}
                />
              </Box>
            )}
          </>
        ) : (
          <>
            <MovieCarousel
              title={t("moviespage.categories.popular")}
              movies={popularMovies}
              isLoading={popularLoading}
            />
            <MovieCarousel
              title={t("moviespage.categories.now_playing")}
              movies={nowPlayingMovies}
              isLoading={nowPlayingLoading}
            />
            <MovieCarousel
              title={t("moviespage.categories.top_rated")}
              movies={topRatedMovies}
              isLoading={topRatedLoading}
            />
            <MovieCarousel
              title={t("moviespage.categories.upcoming")}
              movies={upcomingMovies}
              isLoading={upcomingLoading}
            />
          </>
        )}
      </Container>
    </Box>
  );
}

export default HomePage;