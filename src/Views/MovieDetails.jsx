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
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import {
  AccessTime,
  CalendarToday,
  ArrowBackIosNew,
} from "@mui/icons-material";
import { useParams, useHistory } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import LoadingSpinner from "../Components/common/LoadingSpinner";
import ErrorMessage from "../Components/common/ErrorMessage";
import EmptyState from "../Components/common/EmptyState";

const MovieDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data: movie, isLoading, error } = useMovieDetails(id);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorMessage message="Failed to load movie details. Please try again later." />
    );
  if (!movie) return <EmptyState message="Movie not found." />;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 6 }}>
      {/* 1. Unified Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: "auto", md: "600px" },
          display: "flex",
          alignItems: "center",
          backgroundImage: `linear-gradient(to right, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 0.85) 50%, rgba(20, 20, 20, 0.4) 100%), url(${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          color: "white",
          py: { xs: 10, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <IconButton
            onClick={() => history.goBack()}
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              zIndex: 10,
            }}
          >
            <ArrowBackIosNew fontSize="small" />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 4, md: 6 },
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            {/* Poster */}
            <Box
              component="img"
              src={movie.poster_path}
              alt={movie.title}
              sx={{
                width: "100%",
                maxWidth: { xs: "250px", sm: "300px", md: "350px" },
                flexShrink: 0,
                borderRadius: 2,
                boxShadow: "0 12px 40px rgba(0,0,0,0.8)",
                display: "block",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />

            {/* Main Title & Key Info */}
            <Box
              sx={{
                pt: { xs: 0, sm: 2 },
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 1,
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                {movie.title}
              </Typography>

              {movie.tagline && (
                <Typography
                  variant="h6"
                  color="secondary"
                  sx={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    opacity: 0.9,
                    mb: 3,
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  {movie.tagline}
                </Typography>
              )}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  mb: 3,
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarToday fontSize="small" color="secondary" />
                  <Typography variant="body1">
                    {movie.release_date?.split("-")[0]}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTime fontSize="small" color="secondary" />
                  <Typography variant="body1">{movie.runtime} min</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Rating
                    value={movie.vote_average / 2}
                    precision={0.5}
                    readOnly
                    size="small"
                    sx={{ color: "secondary.main" }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {movie.vote_average?.toFixed(1)}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                {movie.genres?.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.15)",
                      color: "white",
                      backdropFilter: "blur(4px)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 2. Overview & Cast Section */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Grid container spacing={6}>
          {/* Overview */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Overview
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
            >
              {movie.overview}
            </Typography>
          </Grid>

          {/* Cast */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Top Cast
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                pb: 2,
                "&::-webkit-scrollbar": { height: "6px" },
                "&::-webkit-scrollbar-thumb": {
                  bgcolor: "rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
              }}
            >
              {movie.cast?.slice(0, 15).map((actor) => (
                <Card
                  key={actor.id}
                  sx={{
                    minWidth: 140,
                    maxWidth: 140,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: "none",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="175"
                    image={
                      actor.profile_path
                        ? actor.profile_path
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&size=175&background=333&color=fff`
                    }
                    alt={actor.name}
                    sx={{
                      objectPosition: "center top",
                      bgcolor: "rgba(255,255,255,0.05)",
                    }}
                  />
                  <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{ fontWeight: 600 }}
                    >
                      {actor.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      noWrap
                      display="block"
                    >
                      {actor.character}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* 3. Additional Details */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Divider sx={{ mb: 4, opacity: 0.5 }} />
        <Grid container spacing={4}>
          <Grid item xs={6} sm={3}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              Status
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {movie.status}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              Language
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, textTransform: "uppercase" }}
            >
              {movie.original_language}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              Budget
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : "-"}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              Revenue
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : "-"}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieDetails;
