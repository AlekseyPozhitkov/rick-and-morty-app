import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled, Typography } from '@mui/material';

const MyTypography = styled(Typography)({
    fontFamily: "\"Karla\", serif",
    fontOpticalSizing: "auto",
    fontWeight: "700",
    fontSize: 18,
    textTransform: "capitalize",
    fontStyle: "normal"
})

export default function Footer() {
    return (
        <Box>
            <AppBar
                sx={{
                    justifyContent: "center",
                    height: 60,
                    padding:
                    {
                        xl: "0 25%",
                        lg: "0 20%",
                        md: "0 10%"
                    },
                    backgroundColor: "white",
                    color: "black",
                    margin: "40px 0 0"
                }}
                position="static"
            >
                <MyTypography>
                    Make with ❤️ for the MobProgramming team
                </MyTypography>

            </AppBar>
        </Box >
    );
}