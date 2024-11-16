import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../public/rick&morty.svg";
import { LINK_ITEMS } from "./constants";
import { navbarStyles } from "./styles";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <AppBar sx={navbarStyles.appBar}>
      <Toolbar disableGutters sx={navbarStyles.toolbar}>
        <Link to="/">
          <img src={logo} alt="RickAndMorty" />
        </Link>

        <IconButton onClick={toggleMenu} sx={navbarStyles.burger}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <Box
          component="nav"
          sx={{ ...navbarStyles.navBox, display: { xs: menuOpen ? "flex" : "none", sm: "flex" } }}
        >
          {LINK_ITEMS.map((page, index) => (
            <Box
              key={page.title}
              component={Link}
              sx={navbarStyles.navLink}
              to={page.path}
              onClick={() => setMenuOpen(false)}
            >
              {page.title}
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
