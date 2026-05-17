import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Rating,
  Divider,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import {
  AccessTime,
  CalendarToday,
  ArrowBackIosNew,
  PlayArrow,
  Add,
} from "@mui/icons-material";
import { useParams, useHistory } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import ErrorMessage from "../Components/common/ErrorMessage";
import EmptyState from "../Components/common/EmptyState";
import MovieCarousel from "../Components/Movies/MovieCarousel";

const MovieDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data: movie, isLoading, error } = useMovieDetails(id);

  if (isLoading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pt: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box sx={{ width: 300, height: 450, bgcolor: "rgba(255,255,255,0.05)", borderRadius: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ width: "60%", height: 40, bgcolor: "rgba(255,255,255,0.05)", mb: 2 }} />
              <Box sx={{ width: "40%", height: 24, bgcolor: "rgba(255,255,255,0.05)", mb: 4 }} />
              <Box sx={{ width: "100%", height: 100, bgcolor: "rgba(255,255,255,0.05)" }} />
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error)
    return (
      <ErrorMessage message="Failed to load movie details. Please try again later." />
    );
  if (!movie) return <EmptyState message="Movie not found." />;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 8 }}>
      {/* 1. Cinematic Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: "auto", md: "85vh" },
          display: "flex",
          alignItems: "center",
          backgroundImage: `linear-gradient(to right, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 0.8) 40%, rgba(20, 20, 20, 0.2) 100%), url(${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          color: "white",
          pt: { xs: 12, md: 16 },
          pb: { xs: 6, md: 8 },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "150px",
            background: "linear-gradient(to top, #141414, transparent)",
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
          <IconButton
            onClick={() => history.goBack()}
            sx={{
              position: "absolute",
              top: -60,
              left: 0,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              zIndex: 10,
              display: { xs: "none", md: "flex" }
            }}
          >
            <ArrowBackIosNew fontSize="small" />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 4, md: 8 },
              alignItems: { xs: "center", md: "flex-end" },
            }}
          >
            {/* Poster */}
            <Box
              component="img"
              src={movie.poster_path}
              alt={movie.title}
              sx={{
                width: "100%",
                maxWidth: { xs: "240px", sm: "280px", md: "320px" },
                flexShrink: 0,
                borderRadius: 4,
                boxShadow: "0 20px 50px rgba(0,0,0,0.9)",
                display: "block",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />

            {/* Main Title & Key Info */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                pb: { md: 2 }
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  lineHeight: 1.1,
                  mb: 1,
                  textAlign: { xs: "center", md: "left" },
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                {movie.title}
              </Typography>

              {movie.tagline && (
                <Typography
                  variant="h5"
                  sx={{
                    fontStyle: "italic",
                    fontWeight: 500,
                    opacity: 0.8,
                    mb: 3,
                    color: "secondary.main",
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {movie.tagline}
                </Typography>
              )}

              <Stack
                direction="row"
                spacing={3}
                alignItems="center"
                sx={{
                  mb: 4,
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating
                    value={movie.vote_average / 2}
                    precision={0.5}
                    readOnly
                    size="small"
                    sx={{ color: "secondary.main" }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 800 }}>
                    {movie.vote_average?.toFixed(1)}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                  {movie.release_date?.split("-")[0]}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                  {movie.runtime}m
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {movie.genres?.slice(0, 2).map((g) => (
                    <Chip
                      key={g.id}
                      label={g.name}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.1)",
                        color: "white",
                        border: "1px solid rgba(255,255,255,0.2)",
                        fontWeight: 700,
                        fontSize: "0.75rem"
                      }}
                    />
                  ))}
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    fontWeight: 700,
                    px: 6,
                    py: 1.5,
                    borderRadius: 2,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.8)" },
                  }}
                >
                  Watch Now
                </Button>
                <IconButton
                  sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "white",
                    width: 54,
                    height: 54,
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,0.2)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                  }}
                >
                  <Add />
                </IconButton>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 6, position: "relative", zIndex: 2 }}>
        <Grid container spacing={8}>
          {/* Left Column: Overview & Cast */}
          <Grid item xs={12} lg={8}>
            <Box sx={{ mb: 8 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
                Storyline
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.8,
                  fontSize: "1.15rem",
                  maxWidth: "900px"
                }}
              >
                {movie.overview}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
                Top Cast
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  overflowX: "auto",
                  pb: 4,
                  "&::-webkit-scrollbar": { display: "none" },
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                {movie.cast?.slice(0, 12).map((actor) => (
                  <Box key={actor.id} sx={{ minWidth: 160, textAlign: "center" }}>
                    <Box
                      component="img"
                      src={actor.profile_path || `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&size=300&background=1F1F1F&color=fff`}
                      sx={{
                        width: 160,
                        height: 160,
                        borderRadius: "50%",
                        objectFit: "cover",
                        mb: 2,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                        border: "2px solid rgba(255,255,255,0.05)"
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {actor.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                      {actor.character}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Details */}
          <Grid item xs={12} lg={4}>
            <Box
              sx={{
                bgcolor: "rgba(255,255,255,0.03)",
                p: 4,
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>
                Movie Details
              </Typography>
              
              <Stack spacing={3}>
                <Box>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>
                    Status
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{movie.status}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>
                    Original Language
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, textTransform: "uppercase" }}>
                    {movie.original_language}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>
                    Budget
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : "Not Available"}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>
                    Revenue
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : "Not Available"}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieDetails;
