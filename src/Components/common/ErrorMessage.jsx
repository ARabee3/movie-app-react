import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";

function ErrorMessage({ message = "Something went wrong.", onRetry }) {
  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h6" sx={{ color: "error.main", mb: 2 }}>
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant="outlined"
          color="error"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
}

export default ErrorMessage;
