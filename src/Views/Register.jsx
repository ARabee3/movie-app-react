import { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";

// UI/form-handling practice only — no backend.
// Replace with real authentication (Supabase, Firebase, etc.) for production.
function Register() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const history = useHistory();

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        if (!value.trim()) return t("auth.errors.email_required");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return t("auth.errors.email_invalid");
        return undefined;
      case "name":
        if (!value.trim()) return t("auth.errors.name_required");
        return undefined;
      case "username":
        if (!value.trim()) return t("auth.errors.username_required");
        if (value.includes(" ")) return t("auth.errors.username_spaces");
        return undefined;
      case "password":
        if (!value) return t("auth.errors.password_required");
        if (value.length < 8) return t("auth.errors.password_short");
        if (!/[a-z]/.test(value)) return t("auth.errors.password_lowercase");
        if (!/[A-Z]/.test(value)) return t("auth.errors.password_uppercase");
        if (!/[0-9]/.test(value)) return t("auth.errors.password_digit");
        if (!/[*@%$#]/.test(value)) return t("auth.errors.password_special");
        return undefined;
      case "confirmPassword":
        if (!value) return t("auth.errors.confirm_required");
        if (value !== password) return t("auth.errors.confirm_match");
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = () => ({
    email: validateField("email", email),
    name: validateField("name", name),
    username: validateField("username", username),
    password: validateField("password", password),
    confirmPassword: validateField("confirmPassword", confirmPassword),
  });

  const handleBlur = (field) => (e) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, e.target.value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      name: true,
      username: true,
      password: true,
      confirmPassword: true,
    });

    const nextErrors = validateAll();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitting(true);
      // TODO: replace with real auth API call
      if (import.meta.env.DEV) {
        console.log("Register submitted (mock):", { email, name, username });
      }
      await new Promise((r) => setTimeout(r, 800));
      setSubmitting(false);
      history.push("/login");
    }
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        pt: { xs: 12, md: 12 },
        pb: { xs: 8, md: 4 },
        minHeight: { md: "100vh" },
      }}
    >
      <Container maxWidth="xs" disableGutters>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            p: { xs: 4, sm: 5 },
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 6,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
          >
            {t("auth.signup")}
          </Typography>

          <TextField
            label={t("auth.email")}
            variant="outlined"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
            onBlur={handleBlur("email")}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            autoComplete="email"
            fullWidth
          />

          <TextField
            label={t("auth.name")}
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            onBlur={handleBlur("name")}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            autoComplete="name"
            fullWidth
          />

          <TextField
            label={t("auth.username")}
            variant="outlined"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearError("username");
            }}
            onBlur={handleBlur("username")}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            autoComplete="username"
            fullWidth
          />

          <TextField
            label={t("auth.password")}
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearError("password");
            }}
            onBlur={handleBlur("password")}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            fullWidth
          />

          <TextField
            label={t("auth.confirm_password")}
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearError("confirmPassword");
            }}
            onBlur={handleBlur("confirmPassword")}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} color="inherit" /> : t("auth.register_button")}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Register;
