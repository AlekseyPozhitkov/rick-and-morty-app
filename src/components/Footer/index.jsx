import React from "react";
import { Box, Typography } from "@mui/material";
import { footerStyles } from "./styles";

const Footer = () => {
  return (
    <Box component="footer" sx={footerStyles.box}>
      <Typography>Make with ❤️ for the MobProgramming team</Typography>
    </Box>
  );
};

export default Footer;
