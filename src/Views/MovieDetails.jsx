import React from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Rating,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import {
  ArrowBackIosNew,
  PlayArrow,
  Add,
} from "@mui/icons-material";
import { useParams, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useLanguage } from "../context/LanguageContext";
import ErrorMessage from "../Components/common/ErrorMessage";
import EmptyState from "../Components/common/EmptyState";
import MovieCarousel from "../Components/Movies/MovieCarousel";

const MovieDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const { data: movie, isLoading, error } = useMovieDetails(id, lang === "ar" ? "ar-SA" : "en-US");

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
      <ErrorMessage message={t("common.error_movie_details")} />
    );
  if (!movie) return <EmptyState message={t("common.movie_not_found")} />;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 8 }}>
      {/* 1. Cinematic Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: "auto", md: "80vh" },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          color: "white",
          pt: { xs: 12, md: 14 },
          pb: { xs: 6, md: 8 },
        }}
      >
        {/* Backdrop image layer */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            zIndex: 0,
          }}
        />
        {/* Gradient overlays — direction-aware for RTL */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: lang === "ar"
              ? "linear-gradient(to left, rgba(20,20,20,0.25) 0%, rgba(20,20,20,0.65) 45%, rgba(20,20,20,0.9) 100%)"
              : "linear-gradient(to right, rgba(20,20,20,0.25) 0%, rgba(20,20,20,0.65) 45%, rgba(20,20,20,0.9) 100%)",
            zIndex: 1,
          }}
        />
        {/* Bottom fade */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "150px",
            background: "linear-gradient(to top, #141414, transparent)",
            zIndex: 2,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 3 }}>
          {/* Back button */}
          <IconButton
            onClick={() => history.goBack()}
            sx={{
              position: "absolute",
              top: { xs: -40, md: -50 },
              ...(lang === "ar" ? { right: 0 } : { left: 0 }),
              bgcolor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              color: "white",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              zIndex: 10,
            }}
          >
            <ArrowBackIosNew fontSize="small" sx={{ transform: lang === "ar" ? "rotate(180deg)" : "none" }} />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 4, md: 6 },
              alignItems: { xs: "center", md: "center" },
            }}
          >
            {/* Poster */}
            <Box
              component="img"
              src={movie.poster_path}
              alt={movie.original_title || movie.title}
              sx={{
                width: "100%",
                maxWidth: { xs: "220px", sm: "260px", md: "300px" },
                flexShrink: 0,
                borderRadius: 3,
                boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
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
                justifyContent: "center",
                textAlign: { xs: "center", md: "start" },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
                  lineHeight: 1.15,
                  mb: 1,
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                {movie.original_title || movie.title}
              </Typography>

              {movie.title !== movie.original_title && (
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    opacity: 0.7,
                    mb: 1.5,
                    color: "text.secondary",
                  }}
                >
                  {movie.title}
                </Typography>
              )}

              {movie.tagline && (
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    fontWeight: 500,
                    opacity: 0.8,
                    mb: 3,
                    color: "secondary.main",
                    fontSize: "1.1rem",
                  }}
                >
                  « {movie.tagline} »
                </Typography>
              )}

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  mb: 3,
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", md: "flex-start" },
                  gap: 1.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Rating
                    value={movie.vote_average / 2}
                    precision={0.5}
                    readOnly
                    size="small"
                    sx={{ color: "secondary.main" }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    {movie.vote_average?.toFixed(1)}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                  {movie.release_date?.split("-")[0]}
                </Typography>
                {movie.runtime > 0 && (
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                    {movie.runtime} {t("movie_details.min")}
                  </Typography>
                )}
              </Stack>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" }, mb: 3 }}>
                {movie.genres?.map((g) => (
                  <Chip
                    key={g.id}
                    label={g.name}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.08)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.15)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                    }}
                  />
                ))}
              </Box>

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
                    px: 5,
                    py: 1.5,
                    borderRadius: 2,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.85)" },
                  }}
                >
                  {t("movie_details.watch_now")}
                </Button>
                <IconButton
                  sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "white",
                    width: 52,
                    height: 52,
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

      {/* 2. Overview, Cast & Details Section */}
      <Container maxWidth="lg" sx={{ mt: 6, position: "relative", zIndex: 2 }}>
        {/* Overview */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
            {t("movie_details.overview")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.9,
              fontSize: "1.05rem",
            }}
          >
            {movie.overview}
          </Typography>
        </Box>

        {/* Movie Info Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
            gap: 2,
            mb: 6,
          }}
        >
          {[
            { label: t("movie_details.status"), value: movie.status },
            { label: t("movie_details.language"), value: movie.original_language?.toUpperCase() },
            { label: t("movie_details.budget"), value: movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : "—" },
            { label: t("movie_details.revenue"), value: movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : "—" },
          ].map((item) => (
            <Box
              key={item.label}
              sx={{
                bgcolor: "rgba(255,255,255,0.04)",
                p: 2.5,
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, display: "block", mb: 0.5 }}>
                {item.label}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Cast */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
            {t("movie_details.top_cast")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              pb: 3,
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {movie.cast?.slice(0, 12).map((actor) => (
              <Box key={actor.id} sx={{ minWidth: 130, textAlign: "center", flexShrink: 0 }}>
                <Box
                  component="img"
                  src={actor.profile_path || `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&size=300&background=1F1F1F&color=fff`}
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    objectFit: "cover",
                    mb: 1.5,
                    mx: "auto",
                    display: "block",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                    border: "2px solid rgba(255,255,255,0.08)",
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.3, fontSize: "0.85rem" }}>
                  {actor.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem" }}>
                  {actor.character}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MovieDetails;
