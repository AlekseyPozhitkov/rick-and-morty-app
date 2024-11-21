import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps
} from "@mui/material";
import { mergeSx } from "merge-sx";

import { selectStyles } from "./styles";

interface ItemSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  sx: Record<string, SxProps>;
}

export const ItemSelect = ({ label, options, onChange, sx, value }: ItemSelectProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  const handleReset = () => {
    onChange("");
  };

  return (
    <Box sx={mergeSx(selectStyles.box, sx)}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>

        <Select
          sx={selectStyles.select}
          value={value}
          label={label}
          onChange={handleChange}
          MenuProps={{
            disableScrollLock: true,
            PaperProps: {
              style: {
                maxHeight: "200px",
                overflowY: "auto"
              }
            }
          }}
        >
          <MenuItem onClick={handleReset}>
            <Button fullWidth color="warning">
              Reset
            </Button>
          </MenuItem>
          {options.map((option) => (
            <MenuItem sx={selectStyles.menuItem} key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
