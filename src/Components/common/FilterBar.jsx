import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Popularity" },
  { value: "vote_average.desc", label: "Rating" },
  { value: "primary_release_date.desc", label: "Release Date" },
  { value: "original_title.asc", label: "Title A-Z" },
];

const RATING_OPTIONS = [
  { value: "", label: "Any" },
  { value: "5", label: "5+" },
  { value: "6", label: "6+" },
  { value: "7", label: "7+" },
  { value: "8", label: "8+" },
];

const LANGUAGE_OPTIONS = [
  { value: "", label: "All" },
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "zh", label: "Chinese" },
  { value: "hi", label: "Hindi" },
  { value: "it", label: "Italian" },
];

function FilterBar({ genres = [], filters, onFilterChange }) {
  const selectedGenres = filters.with_genres ? filters.with_genres.split(",").map(Number) : [];

  const toggleGenre = (genreId) => {
    const next = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];
    onFilterChange({ ...filters, with_genres: next.length ? next.join(",") : "" });
  };

  const handleChange = (key) => (e) => {
    onFilterChange({ ...filters, [key]: e.target.value });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          "& .MuiChip-root": {
            transition: "all 0.2s ease",
          },
        }}
      >
        {genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            variant={selectedGenres.includes(genre.id) ? "filled" : "outlined"}
            onClick={() => toggleGenre(genre.id)}
            size="small"
            sx={{
              color: selectedGenres.includes(genre.id) ? "#fff" : "text.secondary",
              bgcolor: selectedGenres.includes(genre.id) ? "primary.main" : "transparent",
              borderColor: "rgba(255,255,255,0.15)",
              "&:hover": {
                bgcolor: selectedGenres.includes(genre.id) ? "primary.dark" : "rgba(255,255,255,0.08)",
              },
            }}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel sx={{ color: "text.secondary" }}>Sort By</InputLabel>
          <Select
            value={filters.sort_by || ""}
            label="Sort By"
            onChange={handleChange("sort_by")}
            sx={{
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.15)" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel sx={{ color: "text.secondary" }}>Rating</InputLabel>
          <Select
            value={filters.vote_average_gte || ""}
            label="Rating"
            onChange={handleChange("vote_average_gte")}
            sx={{
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.15)" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
            }}
          >
            {RATING_OPTIONS.map((opt) => (
              <MenuItem key={opt.label} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 110 }}>
          <InputLabel sx={{ color: "text.secondary" }}>Language</InputLabel>
          <Select
            value={filters.with_original_language || ""}
            label="Language"
            onChange={handleChange("with_original_language")}
            sx={{
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.15)" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
            }}
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <MenuItem key={opt.label} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default FilterBar;
