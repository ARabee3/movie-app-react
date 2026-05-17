import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useHistory } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const history = useHistory();

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

  const goTo = (path) => {
    history.push(path);
    setMobileOpen(false);
  };

  const handleNavSearch = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      history.push(`/?q=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch("");
      setMobileOpen(false);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: scrolled
            ? "rgba(20, 20, 20, 0.9)"
            : "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.5)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Typography
            variant="h6"
            onClick={() => history.push("/")}
            sx={{
              fontWeight: "bold",
              letterSpacing: 2,
              color: "#E50914",
              cursor: "pointer",
              fontSize: "1.3rem",
            }}
          >
            CineStream
          </Typography>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
            <Button sx={{ color: "#fff", textTransform: "none", fontSize: "1rem" }} onClick={() => history.push("/")}>
              Home
            </Button>
            <Button sx={{ color: "#fff", textTransform: "none", fontSize: "1rem" }} onClick={() => history.push("/movies")}>
              Movies
            </Button>

            <Box component="form" onSubmit={handleNavSearch} sx={{ mx: 1 }}>
              <TextField
                placeholder="Search..."
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
                    sx: { color: "#fff", fontSize: "0.9rem" },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.08)",
                    borderRadius: 2,
                    width: 180,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                    "& fieldset": { borderColor: "transparent" },
                    "&:hover fieldset": { borderColor: "transparent" },
                    "&.Mui-focused fieldset": { borderColor: "primary.main" },
                  },
                }}
              />
            </Box>

            <Button sx={{ color: "#fff", textTransform: "none", fontSize: "1rem" }} onClick={() => history.push("/login")}>
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => history.push("/register")}
              sx={{
                backgroundColor: "#E50914",
                color: "#fff",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "6px",
                px: 2,
                boxShadow: "0 2px 10px rgba(229, 9, 20, 0.3)",
                "&:hover": {
                  backgroundColor: "#b20710",
                  boxShadow: "0 4px 15px rgba(229, 9, 20, 0.5)",
                },
              }}
            >
              Register
            </Button>
          </Box>

          {/* Mobile Hamburger Icon */}
          <IconButton
            sx={{ display: { md: "none" }, color: "#fff" }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 250,
            backgroundColor: "#1F1F1F",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#E50914", letterSpacing: 2 }}>
            CineStream
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
        <List sx={{ px: 1 }}>
          <Box component="form" onSubmit={handleNavSearch} sx={{ px: 2, py: 1.5 }}>
            <TextField
              fullWidth
              placeholder="Search movies..."
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
                  sx: { color: "#fff", fontSize: "0.9rem" },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.08)",
                  borderRadius: 2,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "transparent" },
                  "&.Mui-focused fieldset": { borderColor: "primary.main" },
                },
              }}
            />
          </Box>
          {[
            { label: "Home", path: "/" },
            { label: "Movies", path: "/movies" },
            { label: "Login", path: "/login" },
            { label: "Register", path: "/register" },
          ].map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => goTo(item.path)}
                sx={{
                  color: "#B3B3B3",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(229, 9, 20, 0.1)",
                    color: "#fff",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
