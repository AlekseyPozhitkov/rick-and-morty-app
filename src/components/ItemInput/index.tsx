import { Box, SxProps, TextField } from "@mui/material";
import { mergeSx } from "merge-sx";
import { ChangeEvent } from "react";

import { inputStyles } from "./styles";

interface ItemInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  sx?: SxProps;
  value: string;
}

export const ItemInput = ({ onChange, placeholder, sx, value }: ItemInputProps) => (
  <Box sx={mergeSx(inputStyles.box, sx)}>
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
