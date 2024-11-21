import { Box } from "@mui/material";

import spiral from "../../public/spiral.svg";
import { spinnerStyles } from "./styles";

export const Spinner = () => (
  <Box sx={spinnerStyles.spinnerOverlay}>
    <Box component="img" src={spiral} sx={spinnerStyles.spinner} alt="Loading..." />
  </Box>
);
