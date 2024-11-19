import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../public/rick&morty.svg";
import { LINK_ITEMS, LinkItem } from "./constants";
import { navbarStyles } from "./styles";

export const Navbar = (): JSX.Element => {
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
          {LINK_ITEMS.map((item: LinkItem) => (
            <Box
              key={item.title}
              component={Link}
              sx={navbarStyles.navLink}
              to={item.path}
              onClick={() => setMenuOpen(false)}
            >
              {item.title}
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
