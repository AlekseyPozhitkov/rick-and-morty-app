import { AppBar, Box, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

import logo from "../../public/rick&morty.svg";
import { LINK_ITEMS } from "./constants";
import { navbarStyles } from "./styles";

export const Navbar = () => (
  <AppBar sx={navbarStyles.appBar}>
    <Toolbar sx={navbarStyles.toolbar}>
      <img src={logo} alt="RickAndMorty" />
      <Box component="nav" sx={navbarStyles.navBox}>
        {LINK_ITEMS.map((page, index) => (
          <Box key={index} component={Link} sx={navbarStyles.navLink} to={page.link} color="inherit">
            {page.title}
          </Box>
        ))}
      </Box>
    </Toolbar>
  </AppBar>
);
