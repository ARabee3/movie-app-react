import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./Views/HomePage";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Navbar from "./Components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const movieTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#E50914",
      },
      secondary: {
        main: "#F5C518",
      },
      background: {
        default: "#141414",
        paper: "#1F1F1F",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#B3B3B3",
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h5: {
        fontWeight: 600,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={movieTheme}>
        <CssBaseline />

        <BrowserRouter>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              bgcolor: "background.default",
            }}
          >
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Switch>
                <Route path="/" component={HomePage} exact />
                <Route
                  path="/movies"
                  component={() => <div>Movies Page</div>}
                />
                <Route
                  path="/movies/:id"
                  component={() => <div>Movie Details Page</div>}
                />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route
                  path="/profile"
                  component={() => <div>Profile Page</div>}
                />
                <Route path="*" component={() => <div>404 Not Found</div>} />
              </Switch>
            </Box>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
