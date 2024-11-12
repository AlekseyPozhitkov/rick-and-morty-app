import { Box, TextField } from "@mui/material";

import { inputStyles } from "./styles";

export const ItemInput = ({ onChange, placeholder, sx, value }) => (
  <Box sx={{ ...inputStyles.box, ...sx?.box }}>
    <TextField
      sx={{ ...inputStyles.textField }}
      id="outlined-basic"
      label={placeholder || ` Filter by name...`}
      variant="outlined"
      onChange={onChange}
      value={value} // Добавлено для отображения текущего значения
    />
  </Box>
);
