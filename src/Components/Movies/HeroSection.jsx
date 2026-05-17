import { Box, Typography, Button, Container, Stack, Skeleton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useHistory } from "react-router-dom";

function HeroSection({ movie, isLoading }) {
  const history = useHistory();

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
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to right, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.4) 40%, transparent 100%), linear-gradient(to top, rgba(20,20,20,1) 0%, transparent 30%)",
          zIndex: 1,
        },
      }}
    >
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
              Play
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
              More Info
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
