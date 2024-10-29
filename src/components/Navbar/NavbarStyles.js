import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

export const AppBarStyled = styled(AppBar)({
  background: "#FFF",
  color: "#000",
})

export const ToolbarStyled = styled(Toolbar)({
  width: "100%",
  maxWidth: "1020px",
  padding: "0 !important",
  margin: "0 auto",
  justifyContent: "space-between"
})

export const LinkWrapper = styled("div")({
  display: "flex",
  gap: 24
})

export const LinkStyled = styled(Link)({
  fontFamily: '"Karla", serif',
  fontOpticalSizing: "auto",
  fontWeight: "700",
  fontSize: 18,
  textTransform: "capitalize",
  fontStyle: "normal",
});




