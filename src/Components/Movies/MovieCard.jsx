import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

function MovieCard({ movie, loading = false }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const history = useHistory();

  if (loading) {
    return (
      <Box sx={{ width: "100%", maxWidth: 240, mx: "auto" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            aspectRatio: "2/3",
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.05)",
          }}
        />
        <Box sx={{ pt: 1.5 }}>
          <Skeleton width="80%" height={24} sx={{ mb: 0.5 }} />
          <Skeleton width="40%" height={20} />
        </Box>
      </Box>
    );
  }

  const rating = movie.vote_average;
  const ratingColor =
    rating >= 7.5 ? "#4caf50" : rating >= 5 ? "#ff9800" : "#f44336";

  return (
    <Card
      onClick={() => history.push(`/movies/${movie.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "transparent",
        cursor: "pointer",
        width: "100%",
        maxWidth: 240,
        mx: "auto",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered
          ? "0 12px 30px rgba(0,0,0,0.7)"
          : "0 4px 10px rgba(0,0,0,0.3)",
        "&:hover": {
          zIndex: 10,
        },
      }}
    >
      <Box sx={{ position: "relative", aspectRatio: "2/3" }}>
        {!imgLoaded && (
          <Skeleton
            variant="rectangular"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(255,255,255,0.05)",
            }}
          />
        )}

        <CardMedia
          component="img"
          image={movie.poster}
          alt={movie.title}
          onLoad={() => setImgLoaded(true)}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: imgLoaded ? "block" : "none",
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80%",
            background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
            opacity: 1,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Rating badge */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            insetInlineEnd: 10,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            px: 1,
            py: 0.4,
            borderRadius: 1.5,
            bgcolor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            zIndex: 2,
          }}
        >
          <StarIcon sx={{ fontSize: 14, color: ratingColor }} />
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            {rating?.toFixed(1)}
          </Typography>
        </Box>

        {/* Content Overlay */}
        <CardContent
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: 2.5,
            zIndex: 3,
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            transition: "transform 0.3s ease",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              lineHeight: 1.2,
              mb: 0.5,
              color: "#fff",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)"
            }}
          >
            {movie.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>
              {movie.release_date?.slice(0, 4)}
            </Typography>
            {movie.genreNames && movie.genreNames.length > 0 && (
              <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 800, textTransform: "uppercase", fontSize: "0.65rem", letterSpacing: 0.5 }}>
                {movie.genreNames[0]}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}

export default MovieCard;
