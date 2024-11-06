import Button from "@mui/material/Button";
import "@fontsource/roboto/500.css";
import { buttonStyles } from "./styles";

export const LoadMoreButton = ({ onClick }) => {
  return (
    <Button
      sx={buttonStyles.button}
      variant="contained"
      onClick={onClick} // Передаем onClick в кнопку
    >
      Load more
    </Button>
  );
};
