import React, { Component } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

class ErrorBoundaryClass extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            bgcolor: "background.default",
            color: "text.primary",
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            {this.props.t("common.error")}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: 480 }}>
            {this.state.error?.message || "An unexpected error occurred."}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
          >
            {this.props.t("common.reload_page")}
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

function ErrorBoundary(props) {
  const { t } = useTranslation();
  return <ErrorBoundaryClass {...props} t={t} />;
}

export default ErrorBoundary;
