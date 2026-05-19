import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SORT_VALUES = [
  "popularity.desc",
  "vote_average.desc",
  "primary_release_date.desc",
  "original_title.asc",
];

const RATING_VALUES = ["", "5", "6", "7", "8"];

const LANGUAGE_VALUES = ["", "en", "ar", "fr", "es", "de", "ja", "ko", "zh", "hi", "it"];

function FilterBar({ genres = [], filters, onFilterChange }) {
  const { t } = useTranslation();
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          overflowX: "auto",
          whiteSpace: "nowrap",
          pb: 1,
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "& .MuiChip-root": {
            transition: "all 0.2s ease",
            flexShrink: 0,
            fontWeight: 600,
            px: 1,
          },
        }}
      >
        {genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            variant={selectedGenres.includes(genre.id) ? "filled" : "outlined"}
            onClick={() => toggleGenre(genre.id)}
            size="medium"
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

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel sx={{ color: "text.secondary" }}>{t("filter.sort_by")}</InputLabel>
          <Select
            value={filters.sort_by || ""}
            label={t("filter.sort_by")}
            onChange={handleChange("sort_by")}
            sx={{
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.15)" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
            }}
          >
            {SORT_VALUES.map((value) => (
              <MenuItem key={value} value={value}>
                {t(`filter.sort_options.${value.replace(/\./g, "_")}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel sx={{ color: "text.secondary" }}>{t("filter.rating")}</InputLabel>
          <Select
            value={filters.vote_average_gte || ""}
            label={t("filter.rating")}
            onChange={handleChange("vote_average_gte")}
            sx={{
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.15)" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
            }}
          >
            {RATING_VALUES.map((value) => (
              <MenuItem key={value || "any"} value={value}>
                {t(`filter.rating_options.${value || "any"}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 110 }}>
          <InputLabel sx={{ color: "text.secondary" }}>{t("filter.language")}</InputLabel>
          <Select
            value={filters.with_original_language || ""}
            label={t("filter.language")}
            onChange={handleChange("with_original_language")}
            sx={{
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.15)" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
            }}
          >
            {LANGUAGE_VALUES.map((value) => (
              <MenuItem key={value || "all"} value={value}>
                {t(`filter.language_options.${value || "all"}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default FilterBar;
