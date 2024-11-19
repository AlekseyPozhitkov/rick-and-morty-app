import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { arrowStyles } from "./styles";

export const GoBackButton = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Box onClick={() => navigate(-1)} sx={arrowStyles}>
      <ArrowBackIcon sx={{ fontSize: "20px" }} />
      <Typography sx={{ fontWeight: "700", fontSize: "18px" }}>GO BACK</Typography>
    </Box>
  );
};
