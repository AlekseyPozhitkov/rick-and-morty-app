import logo from "../../public/rick&morty.svg";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import { navbarStyles } from "./styles";

const linkItems = {
  "/": "Characters",
  "/locations": "Locations",
  "/episodes": "Episodes",
};

export default function Navbar() {
  return (
    <AppBar sx={navbarStyles.appBar}>
      <Toolbar sx={navbarStyles.toolbar}>
        <img src={logo} alt="RickAndMorty" />
        <Box component="nav" sx={navbarStyles.navBox}>
          {Object.entries(linkItems).map(([key, value]) => {
            return (
              <Box component={Link} sx={navbarStyles.navLink} to={key} color="inherit">
                {value}
              </Box>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
