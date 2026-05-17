import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";

// UI/form-handling practice only — no backend.
// Replace with real authentication (Supabase, Firebase, etc.) for production.
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const history = useHistory();

  const validateField = (field, value) => {
    if (field === "email") {
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Please enter a valid email address";
    }
    if (field === "password") {
      if (!value) return "Password is required";
      if (value.length < 8)
        return "Password must be at least 8 characters long";
    }
    return undefined;
  };

  const validateAll = () => ({
    email: validateField("email", email),
    password: validateField("password", password),
  });

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, field === "email" ? email : password);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const nextErrors = validateAll();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitting(true);
      // TODO: replace with real auth API call
      if (import.meta.env.DEV) {
        console.log("Login submitted (mock):", { email });
      }
      await new Promise((r) => setTimeout(r, 800));
      setSubmitting(false);
      history.push("/");
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
        py: { xs: 8, md: 0 },
        minHeight: { md: "calc(100vh - 70px)" },
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
            Sign In
          </Typography>

          <TextField
            label="Email Address"
            variant="outlined"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
            onBlur={handleBlur("email")}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            autoComplete="email"
            fullWidth
          />

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
            onBlur={handleBlur("password")}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
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
            {submitting ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
export default Login;
