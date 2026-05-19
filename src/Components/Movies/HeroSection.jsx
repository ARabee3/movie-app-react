import { Box, Typography, Button, Container, Stack, Skeleton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HeroSection({ movie, isLoading }) {
  const history = useHistory();
  const { t } = useTranslation();

  if (isLoading || !movie) {
    return (
      <Box sx={{ width: "100%", height: { xs: "50vh", md: "80vh" }, bgcolor: "rgba(255,255,255,0.05)" }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "60vh", md: "85vh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Backdrop image */}
      <Box
        component="img"
        src={movie.backdrop}
        alt={movie.title}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to right, rgba(20,20,20,0.25) 0%, rgba(20,20,20,0.65) 45%, rgba(20,20,20,0.9) 100%), linear-gradient(0deg, rgba(20,20,20,1) 0%, transparent 30%)`,
          zIndex: 1,
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        <Box sx={{ maxWidth: { xs: "100%", md: "50%" } }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              lineHeight: 1.1,
              mb: 2,
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            {movie.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.9rem", md: "1.1rem" },
              color: "rgba(255,255,255,0.8)",
              mb: 4,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textShadow: "0 1px 5px rgba(0,0,0,0.5)",
            }}
          >
            {movie.overview}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={() => history.push(`/movies/${movie.id}`)}
              sx={{
                bgcolor: "white",
                color: "black",
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                "&:hover": { bgcolor: "rgba(255,255,255,0.8)" },
              }}
            >
              {t("movie_details.watch_now")}
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<InfoOutlinedIcon />}
              onClick={() => history.push(`/movies/${movie.id}`)}
              sx={{
                bgcolor: "rgba(109, 109, 110, 0.7)",
                color: "white",
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                "&:hover": { bgcolor: "rgba(109, 109, 110, 0.5)" },
              }}
            >
              {t("movie_details.overview")}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
