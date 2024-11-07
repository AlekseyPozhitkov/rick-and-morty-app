import { Backdrop, Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

import { selectStyles } from "./styles";

export const ItemSelect = ({ label, options, onChange, sx, value }) => {
  const [internalValue, setInternalValue] = useState("");
  const [open, setOpen] = useState(false);

  // Обновляем внутреннее значение при изменении value пропа
  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  // Блокировка и разблокировка прокрутки
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Блокируем прокрутку при открытии
    } else {
      document.body.style.overflow = ""; // Возвращаем прокрутку при закрытии
    }

    // Очистка стилей при размонтировании
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setInternalValue(selectedValue);
    onChange(selectedValue);
    setOpen(false); // Закрываем селект после выбора
  };

  const handleReset = () => {
    setInternalValue(""); // Сбрасываем значение
    onChange(""); // Передаем пустое значение в `onChange` для сброса
    setOpen(false); // Закрываем селект после сброса
  };

  return (
    <>
      <Backdrop open={open} sx={selectStyles.backdrop} />
      <Box sx={{ ...selectStyles.box, ...sx?.box }}>
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            sx={selectStyles.select}
            value={internalValue} // Используем внутреннее значение
            label={label}
            onChange={handleChange}
            open={open} // добавлено обратно
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
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
