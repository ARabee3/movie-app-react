import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTranslation } from "react-i18next";

function ErrorMessage({ message, onRetry }) {
  const { t } = useTranslation();

  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h6" sx={{ color: "error.main", mb: 2 }}>
        {message || t("common.error")}
      </Typography>
      {onRetry && (
        <Button
          variant="outlined"
          color="error"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
        >
          {t("common.retry")}
        </Button>
      )}
    </Box>
  );
}

export default ErrorMessage;
