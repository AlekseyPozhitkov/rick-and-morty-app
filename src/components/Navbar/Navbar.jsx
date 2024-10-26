import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo from "../../public/rick&morty.svg"
import { styled } from '@mui/material';

const MyBytton = styled(Button)({
    fontFamily: "\"Karla\", serif",
    fontOpticalSizing: "auto",
    fontWeight: "700",
    fontSize: 18,
    textTransform: "capitalize",
    fontStyle: "normal"
})

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                sx={{
                    height: 60,
                    padding: {
                        xl: "0 25%",
                        lg: "0 20%",
                        md: "0 10%",
                        sm: "0 10%"
                    },
                    backgroundColor: "white",
                    color: "black"
                }}
                position="static"
            >
                <Toolbar sx={{ padding: "0 !important" }}>
                    <img style={{ marginRight: "auto" }} src={logo} alt="RickAndMorty" />
                    <MyBytton color="inherit">Characters</MyBytton>
                    <MyBytton color="inherit">Locations</MyBytton>
                    <MyBytton color="inherit">Episodes</MyBytton>
                </Toolbar>
            </AppBar>
        </Box >
    );
}