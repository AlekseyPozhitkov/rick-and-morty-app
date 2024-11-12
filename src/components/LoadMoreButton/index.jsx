import { Button } from "@mui/material";

import { buttonStyles } from "./styles";

export const LoadMoreButton = ({ onClick }) => (
  <Button sx={buttonStyles.button} variant="contained" onClick={onClick}>
    Load more
  </Button>
);
