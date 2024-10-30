import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

export const ItemSelect = ({ label, options, onChange, customStyles }) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    onChange(selectedValue);
  };

  const handleReset = () => {
    setValue(""); // Сбрасываем значение
    onChange(""); // Передаем пустое значение в `onChange` для сброса
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 240, ...customStyles?.box }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          sx={{ textAlign: "left" }}
          value={value}
          label={label}
          onChange={handleChange}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          MenuProps={{
            disableScrollLock: true,
            PaperProps: {
              style: {
                maxHeight: 200,
                overflowY: "auto",
              },
            },
          }}
        >
          <MenuItem onClick={handleReset}>
            <Button fullWidth color="warning">
              Reset
            </Button>
          </MenuItem>
          {options.map((option) => (
            <MenuItem sx={{ textAlign: "left" }} key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
