import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { inputStyles } from "./styles";

export const ItemInput = ({ onChange, placeholder, sx, value }) => {
  return (
    <Box sx={{ ...inputStyles.box, ...sx?.box }}>
      <TextField
        sx={{ ...inputStyles.textField, ...sx?.textField }}
        id="outlined-basic"
        label={placeholder || "Filter by name..."}
        variant="outlined"
        onChange={onChange}
        value={value} // Добавлено для отображения текущего значения
      />
    </Box>
  );
};
