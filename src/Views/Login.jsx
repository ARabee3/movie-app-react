import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const validate = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      nextErrors.password = "Password is required";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters long";
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log("Logging in with:", { email, password });
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
            error={Boolean(errors.email)}
            helperText={errors.email}
            autoComplete="email"
            fullWidth
            sx={{
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #1F1F1F inset !important",
                WebkitTextFillColor: "white !important",
                caretColor: "white",
                transition: "background-color 5000s ease-in-out 0s",
              },
              "& input:-webkit-autofill:focus": {
                WebkitBoxShadow: "0 0 0 1000px #1F1F1F inset !important",
                WebkitTextFillColor: "white !important",
              },
              "& input:-webkit-autofill:hover": {
                WebkitBoxShadow: "0 0 0 1000px #1F1F1F inset !important",
                WebkitTextFillColor: "white !important",
              },
            }}
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
            error={Boolean(errors.password)}
            helperText={errors.password}
            fullWidth
            sx={{
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #1F1F1F inset !important",
                WebkitTextFillColor: "white !important",
                caretColor: "white",
                transition: "background-color 5000s ease-in-out 0s",
              },
              "& input:-webkit-autofill:focus": {
                WebkitBoxShadow: "0 0 0 1000px #1F1F1F inset !important",
                WebkitTextFillColor: "white !important",
              },
              "& input:-webkit-autofill:hover": {
                WebkitBoxShadow: "0 0 0 1000px #1F1F1F inset !important",
                WebkitTextFillColor: "white !important",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
export default Login;
