import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MovieGrid from "../Components/Movies/MovieGrid";

function HomePage() {
  const [search, setSearch] = useState("");

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

        <Container maxWidth="sm">
          <TextField
            fullWidth
            placeholder="Search movies or genres..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
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
        <MovieGrid searchQuery={search} />
      </Container>
    </Box>
  );
}

export default HomePage;
