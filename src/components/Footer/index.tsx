import { Box, Typography } from "@mui/material";
import { FC } from "react";

import { footerStyles } from "./styles";

export const Footer: FC = () => (
  <Box component="footer">
    <Typography sx={footerStyles}>Make with ❤️ for the MobProgramming team</Typography>
  </Box>
);
