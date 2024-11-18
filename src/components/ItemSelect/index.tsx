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

import { selectStyles } from "./styles";

interface ItemSelectProps {
  label: string;
  options: string[];
  value: string; //
  onChange: (value: string) => void;
  sx?: Record<string, SxProps>;
}

export const ItemSelect: React.FC<ItemSelectProps> = ({
  label,
  options,
  onChange = () => {},
  sx,
  value
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  const handleReset = () => {
    onChange("");
  };

  return (
    <Box sx={{ ...selectStyles.box, ...sx?.box } as SxProps}>
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
          {options.map(option => (
            <MenuItem sx={selectStyles.menuItem} key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
