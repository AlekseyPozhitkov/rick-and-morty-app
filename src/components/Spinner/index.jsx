import React from "react";
import spiral from "../../public/spiral.svg"; // Подключаем загруженную картинку
import { Box } from "@mui/material";
import { spinnerStyles } from "./styles";

export const Spinner = () => {
  return (
    <Box sx={spinnerStyles.spinnerOverlay}>
      <Box component="img" src={spiral} sx={spinnerStyles.spinner} alt="Loading..." />
    </Box>
  );
};
