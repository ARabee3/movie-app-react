import { Box, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MovieCard from "./MovieCard";
import { useRef } from "react";

function MovieCarousel({ title, movies = [], isLoading }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const skeletonArray = Array.from({ length: 10 }, (_, i) => i);

  return (
    <Box sx={{ mb: 6, position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 2, px: { xs: 2, md: 0 } }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 800, 
            letterSpacing: "-0.02em",
            color: "text.primary"
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box sx={{ position: "relative", group: "true" }}>
        {/* Navigation Buttons - Hidden on mobile, visible on hover on desktop */}
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            bgcolor: "rgba(0,0,0,0.6)",
            color: "white",
            display: { xs: "none", md: "flex" },
            "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            bgcolor: "rgba(0,0,0,0.6)",
            color: "white",
            display: { xs: "none", md: "flex" },
            "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <ChevronRightIcon />
        </IconButton>

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            scrollBehavior: "smooth",
            pb: 4, // Space for shadows
            px: { xs: 2, md: 0 },
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {isLoading
            ? skeletonArray.map((i) => (
                <Box key={`skeleton-${i}`} sx={{ minWidth: { xs: 160, sm: 200, md: 220 }, flexShrink: 0 }}>
                  <MovieCard loading={true} />
                </Box>
              ))
            : movies.map((movie) => (
                <Box key={movie.id} sx={{ minWidth: { xs: 160, sm: 200, md: 220 }, flexShrink: 0 }}>
                  <MovieCard movie={movie} />
                </Box>
              ))}
        </Box>
      </Box>
    </Box>
  );
}

export default MovieCarousel;
