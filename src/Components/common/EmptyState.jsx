import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function EmptyState({ message = "No results found." }) {
  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        {message}
      </Typography>
    </Box>
  );
}

export default EmptyState;
