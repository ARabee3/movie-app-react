import { useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./Views/HomePage";
import MoviesPage from "./Views/MoviesPage";
import Login from "./Views/Login";
import Register from "./Views/Register";
import MovieDetails from "./Views/MovieDetails";
import Navbar from "./Components/Navbar";
import ErrorBoundary from "./Components/common/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLanguage } from "./context/LanguageContext";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin.default || rtlPlugin],
});

// Create ltr cache
const cacheLtr = createCache({
  key: 'muiltr',
});

function ProfilePage() {
  return <div>Profile Page</div>;
}

function NotFound() {
  return <div>404 Not Found</div>;
}

const queryClient = new QueryClient();

function App() {
  const { lang } = useLanguage();
  const isRTL = lang === "ar";

  useEffect(() => {
    document.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  const movieTheme = useMemo(
    () =>
      createTheme({
        direction: isRTL ? "rtl" : "ltr",
        palette: {
          mode: "dark",
          primary: { main: "#E50914" },
          secondary: { main: "#F5C518" },
          background: { default: "#141414", paper: "#1F1F1F" },
          text: { primary: "#FFFFFF", secondary: "#B3B3B3" },
        },
        shape: { borderRadius: 12 },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h5: { fontWeight: 600 },
        },
        components: {
          MuiInputBase: {
            styleOverrides: {
              input: {
                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px #1F1F1F inset !important",
                  WebkitTextFillColor: "white !important",
                  caretColor: "white",
                  transition: "background-color 5000s ease-in-out 0s",
                },
              },
            },
          },
        },
      }),
    [isRTL],
  );

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={isRTL ? cacheRtl : cacheLtr}>
          <ThemeProvider theme={movieTheme}>
            <CssBaseline />

            <BrowserRouter>
              <Box
                dir={isRTL ? "rtl" : "ltr"}
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
                    <Route path="/movies" component={MoviesPage} exact />
                    <Route path="/movies/:id" component={MovieDetails} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="*" component={NotFound} />
                  </Switch>
                </Box>
              </Box>
            </BrowserRouter>
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
