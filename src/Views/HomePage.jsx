import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Pagination from "@mui/material/Pagination";
import MovieGrid from "../Components/Movies/MovieGrid";
import { useMovieList } from "../hooks/useMovieList";

function HomePage() {
  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);
  const queryFromUrl = params.get("q") || "";
  const pageFromUrl = parseInt(params.get("page"), 10) || 1;

  const [searchInput, setSearchInput] = useState(queryFromUrl);

  const { movies, totalPages, isLoading, error } = useMovieList({
    searchQuery: queryFromUrl,
    page: pageFromUrl,
  });

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
      <Box
        sx={{
          pt: { xs: 4, md: 8 },
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
          Discover Movies
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
          Browse our collection of critically acclaimed films
        </Typography>

        <Container maxWidth="sm" component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            placeholder="Search movies..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      type="submit"
                      size="small"
                      sx={{ color: "text.secondary" }}
                    >
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

      <Container maxWidth="xl">
        {queryFromUrl && (
          <Typography sx={{ mb: 2, color: "text.secondary" }}>
            {movies.length > 0
              ? `Showing results for "${queryFromUrl}"`
              : `No results for "${queryFromUrl}"`}
          </Typography>
        )}

        <MovieGrid movies={movies} isLoading={isLoading} error={error} />

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
      </Container>
    </Box>
  );
}

export default HomePage;
