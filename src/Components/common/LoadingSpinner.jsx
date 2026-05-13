import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingSpinner({ size = 48, py = 10 }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py }}>
      <CircularProgress color="primary" size={size} />
    </Box>
  );
}

export default LoadingSpinner;
