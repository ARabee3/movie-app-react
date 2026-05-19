import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

function EmptyState({ message }) {
  const { t } = useTranslation();

  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        {message || t("common.empty")}
      </Typography>
    </Box>
  );
}

export default EmptyState;
