import { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

function MovieCard({ movie }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const history = useHistory();
  const rating = movie.vote_average;

  const ratingBg =
    rating >= 7.5
      ? "rgba(46,125,50,0.85)"
      : rating >= 5
        ? "rgba(237,108,2,0.85)"
        : "rgba(211,47,47,0.85)";

  return (
    <Card
      onClick={() => history.push(`/movies/${movie.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "background.paper",
        cursor: "pointer",
        mx: "auto",
        maxWidth: 280,
        transition:
          "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 24px rgba(0,0,0,0.5)"
          : "0 4px 10px rgba(0,0,0,0.3)",
        border: "1px solid transparent",
        borderColor: hovered ? "rgba(229,9,20,0.4)" : "transparent",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
          pointerEvents: "none",
          zIndex: 1,
        },
      }}
    >
      {/* HD Badge */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          px: 1.5,
          py: 0.4,
          borderRadius: "4px",
          fontSize: "0.75rem",
          fontWeight: "bold",
          zIndex: 2,
          bgcolor: "primary.main",
          color: "#fff",
        }}
      >
        HD
      </Box>

      {/* Rating Badge */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          px: 1.2,
          py: 0.4,
          borderRadius: "4px",
          zIndex: 2,
          bgcolor: ratingBg,
          backdropFilter: "blur(4px)",
        }}
      >
        <StarIcon sx={{ fontSize: 14, color: "#fff" }} />
        <Typography
          component="span"
          sx={{ fontSize: "0.8rem", fontWeight: "bold", color: "#fff" }}
        >
          {rating?.toFixed(1)}
        </Typography>
      </Box>

      {/* Poster Image */}
      {imgError ? (
        <Box
          sx={{
            width: "100%",
            aspectRatio: "2/3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(255,255,255,0.05)",
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: "text.secondary", fontWeight: "bold", opacity: 0.3 }}
          >
            {movie.title?.charAt(0)}
          </Typography>
        </Box>
      ) : (
        <CardMedia
          component="img"
          image={movie.poster}
          alt={movie.title}
          onError={() => setImgError(true)}
          sx={{
            width: "100%",
            aspectRatio: "2/3",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />
      )}

      {/* Bottom Info */}
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          pb: 2.5,
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            lineHeight: 1.2,
            mb: 0.5,
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {movie.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.7)", mb: 1, fontSize: "0.75rem" }}
        >
          {movie.release_date?.slice(0, 4)}
        </Typography>

        {/* Genre Chips - visible on hover */}
        <Box
          sx={{
            display: "flex",
            gap: 0.6,
            flexWrap: "wrap",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {(movie.genreNames || []).slice(0, 2).map((g) => (
            <Chip
              key={g}
              label={g}
              size="small"
              sx={{
                bgcolor: "rgba(229,9,20,0.85)",
                color: "#fff",
                fontSize: "0.7rem",
                fontWeight: 600,
                height: 24,
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
