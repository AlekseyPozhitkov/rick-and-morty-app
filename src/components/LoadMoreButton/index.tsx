import { Button } from "@mui/material";

import { buttonStyles } from "./styles";

interface LoadMoreButtonProps {
  onClick: () => void;
}

export const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => (
  <Button sx={buttonStyles} variant="contained" onClick={onClick}>
    Load more
  </Button>
);
