import { Box, Typography } from "@mui/material";

import { footerStyles } from "./styles";

export const Footer = (): JSX.Element => (
  <Box component="footer">
    <Typography sx={footerStyles}>Make with ❤️ for the MobProgramming team</Typography>
  </Box>
);
