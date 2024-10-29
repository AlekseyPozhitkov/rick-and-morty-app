import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "#FFF",
        color: "#212121",
        height: "60px",
        boxShadow: "-2px 0px 8px 2px rgba(0, 0, 0, 0.1)",
        fontFamily: '"Karla", serif',
        fontOpticalSizing: "auto",
        fontWeight: "700",
        fontSize: "18px",
        textTransform: "capitalize",
        fontStyle: "normal",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "40px 0 0",
      }}
    >
      <Typography sx={{}}>Make with ❤️ for the MobProgramming team</Typography>
    </Box>
  );
};

export default Footer;
