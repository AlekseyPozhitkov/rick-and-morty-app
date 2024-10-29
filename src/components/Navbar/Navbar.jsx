import logo from "../../public/rick&morty.svg";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material";

export const LinkStyled = styled(Link)({
  fontFamily: '"Karla", serif',
  fontOpticalSizing: "auto",
  fontWeight: "700",
  fontSize: "18px",
  textTransform: "capitalize",
  fontStyle: "normal",
});

export default function Navbar() {
  return (
    <AppBar
      sx={{
        background: "#FFF",
        color: "#000",
        position: "static",
        boxShadow: "-2px 0px 8px 2px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          height: "100%",
          maxHeight: "60px",
          width: "100%",
          maxWidth: "1020px",
          padding: "0 !important",
          margin: "0 auto",
          justifyContent: "space-between",
        }}
      >
        <img src={logo} alt="RickAndMorty" />
        <div style={{ display: "flex", gap: 24 }}>
          <LinkStyled to={"/"} color="inherit">
            Characters
          </LinkStyled>
          <LinkStyled to={"/locations"} color="inherit">
            Locations
          </LinkStyled>
          <LinkStyled to={"/episodes"} color="inherit">
            Episodes
          </LinkStyled>
        </div>
      </Toolbar>
    </AppBar>
  );
}
