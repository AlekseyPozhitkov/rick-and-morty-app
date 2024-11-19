import { Box, SxProps, TextField } from "@mui/material";
import { ChangeEvent } from "react";

import { inputStyles } from "./styles";

interface ItemInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  sx?: Record<string, SxProps>;
  value: string;
}

export const ItemInput = ({ onChange, placeholder, sx, value }: ItemInputProps): JSX.Element => (
  <Box sx={{ ...inputStyles.box, ...sx }}>
    <TextField
      sx={inputStyles.textField}
      id="outlined-basic"
      label={placeholder || `Filter by name...`}
      variant="outlined"
      onChange={onChange}
      value={value}
    />
  </Box>
);
