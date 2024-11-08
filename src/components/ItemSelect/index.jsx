import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

import { selectStyles } from "./styles";

export const ItemSelect = ({ label, options, onChange = () => {}, sx, value }) => {
  const [internalValue, setInternalValue] = useState("");

  // Обновляем внутреннее значение при изменении value пропа
  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setInternalValue(selectedValue);
    if (onChange) {
      onChange(selectedValue); // Вызываем onChange только если он есть
    }
  };

  const handleReset = () => {
    setInternalValue(""); // Сбрасываем значение
    if (onChange) {
      onChange(""); // Передаем пустое значение в `onChange` для сброса
    }
  };

  return (
    <>
      <Box sx={{ ...selectStyles.box, ...sx?.box }}>
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            sx={selectStyles.select}
            value={internalValue} // Используем внутреннее значение
            label={label}
            onChange={handleChange}
            MenuProps={selectStyles.menuProps}
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
    </>
  );
};
