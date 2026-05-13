import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const validate = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address";
    }

    if (!name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!username.trim()) {
      nextErrors.username = "Username is required";
    } else if (username.includes(" ")) {
      nextErrors.username = "Username must not contain spaces";
    }

    if (!password) {
      nextErrors.password = "Password is required";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters long";
    } else if (!/[a-z]/.test(password)) {
      nextErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/[A-Z]/.test(password)) {
      nextErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      nextErrors.password = "Password must contain at least one digit";
    } else if (!/[*@%$#]/.test(password)) {
      nextErrors.password =
        "Password must contain at least one special character (*@%$#)";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log("Registering with:", { email, name, username, password });
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
        py: { xs: 8, md: 4 },
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
            Sign Up
          </Typography>

          <TextField
            label="Email Address"
            variant="outlined"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
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
            label="Name"
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            error={Boolean(errors.name)}
            helperText={errors.name}
            autoComplete="name"
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
            label="Username"
            variant="outlined"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearError("username");
            }}
            error={Boolean(errors.username)}
            helperText={errors.username}
            autoComplete="username"
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
              clearError("password");
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

          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearError("confirmPassword");
            }}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
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
            Register
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Register;
