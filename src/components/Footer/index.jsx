import { Box, Typography } from "@mui/material";

import { footerStyles } from "./styles";

export const Footer = () => (
  <Box component="footer">
    <Typography sx={footerStyles.box}>Make with ❤️ for the MobProgramming team</Typography>
  </Box>
);
