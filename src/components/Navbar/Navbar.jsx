import logo from "../../public/rick&morty.svg";
import { AppBarStyled, LinkStyled, LinkWrapper, ToolbarStyled } from "./NavbarStyles";

export default function Navbar() {
  return (
    <AppBarStyled>
      <ToolbarStyled>
        <img src={logo} alt="RickAndMorty" />
        <LinkWrapper>
          <LinkStyled to={"/"} color="inherit">
            Characters
          </LinkStyled>
          <LinkStyled to={"/locations"} color="inherit">
            Locations
          </LinkStyled>
          <LinkStyled to={"/episodes"} color="inherit">
            Episodes
          </LinkStyled>
        </LinkWrapper>
      </ToolbarStyled>
    </AppBarStyled>
  );
}
