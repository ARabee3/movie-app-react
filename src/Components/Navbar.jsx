import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const { lang, changeLanguage } = useLanguage();
  const isRTL = lang === "ar";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavSearch = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      history.push(`/?q=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch("");
      setMobileOpen(false);
    }
  };

  const isHome = location.pathname === "/";

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled
            ? "rgba(10, 10, 10, 0.95)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(15px)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 1100,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: { xs: 70, md: 80 }, gap: { xs: 2, md: 4 } }}>
            {/* Logo */}
            <Typography
              variant="h5"
              onClick={() => history.push("/")}
              sx={{
                fontWeight: 900,
                letterSpacing: -1,
                color: "primary.main",
                cursor: "pointer",
                fontSize: { xs: "1.4rem", md: "1.8rem" },
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
              }}
            >
              CineStream
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              <Button
                onClick={() => history.push("/movies")}
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  px: 2,
                  "&:hover": { color: "primary.main", bgcolor: "transparent" },
                }}
              >
                {t("nav.movies")}
              </Button>
            </Box>

            {/* Middle Search Bar */}
            <Box
              component="form"
              onSubmit={handleNavSearch}
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: isHome ? "none" : "flex" },
                justifyContent: "center",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              <TextField
                placeholder={t("nav.search_placeholder")}
                size="small"
                fullWidth
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.05)",
                    borderRadius: 3,
                    height: 44,
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(255,255,255,0.1)",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.1)",
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "&.Mui-focused": {
                      bgcolor: "rgba(255,255,255,0.12)",
                      borderColor: "primary.main",
                      boxShadow: "0 0 20px rgba(229,9,20,0.15)",
                    },
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    "&::placeholder": { color: "rgba(255,255,255,0.4)", opacity: 1 },
                  },
                }}
              />
            </Box>

            {/* Desktop Actions */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
              <Button
                onClick={() => changeLanguage(isRTL ? "en" : "ar")}
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  minWidth: 40,
                  "&:hover": { color: "primary.main", bgcolor: "transparent" },
                }}
              >
                {isRTL ? "EN" : "AR"}
              </Button>
            </Box>

            {/* Mobile Actions */}
            <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1, ml: "auto" }}>
              <IconButton sx={{ color: "white" }} onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor={isRTL ? "left" : "right"}
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "background.default",
            backgroundImage: "none",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 900, color: "primary.main", letterSpacing: -0.5, mb: 4 }}
          >
            CINESTREAM
          </Typography>

          <Box component="form" onSubmit={handleNavSearch} sx={{ mb: 4 }}>
            <TextField
              fullWidth
              placeholder={t("nav.search_placeholder")}
              size="small"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.05)",
                  borderRadius: 2,
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                },
              }}
            />
          </Box>

          <List spacing={1}>
            {[
              { label: t("nav.home"), path: "/" },
              { label: t("nav.movies"), path: "/movies" },
              { label: t("nav.login"), path: "/login" },
              { label: t("nav.register"), path: "/register" },
            ].map((item) => (
              <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => {
                    history.push(item.path);
                    setMobileOpen(false);
                  }}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    "&:hover": { bgcolor: "rgba(229,9,20,0.1)", color: "primary.main" },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: 700, fontSize: "1.1rem" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              onClick={() => {
                changeLanguage(isRTL ? "en" : "ar");
                setMobileOpen(false);
              }}
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 2,
                py: 1,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {isRTL ? "English" : "العربية"}
            </Button>
          </Box>

        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
