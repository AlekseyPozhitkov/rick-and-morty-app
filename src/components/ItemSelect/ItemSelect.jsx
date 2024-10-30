import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Backdrop } from "@mui/material";

export const ItemSelect = ({ label, options, onChange, customStyles, value }) => {
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
      <Backdrop
        open={open}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Box sx={{ width: "100%", maxWidth: 240, ...customStyles?.box }}>
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            sx={{ textAlign: "left" }}
            value={internalValue} // Используем внутреннее значение
            label={label}
            onChange={handleChange}
            open={open} // добавлено обратно
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            MenuProps={{
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
    </>
  );
};
