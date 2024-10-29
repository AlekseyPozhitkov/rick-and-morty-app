import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MySelect({ label, options, onChange, customStyles }) {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    onChange(selectedValue);
  };

  const handleScroll = () => {
    setOpen(false); // Закрываем меню при прокрутке
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        ...customStyles?.box,
      }}
    >
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
          {options.map((option) => (
            <MenuItem sx={{ textAlign: "left" }} key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
