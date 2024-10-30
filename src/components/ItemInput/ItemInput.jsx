import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const ItemInput = ({ onChange, placeholder, customStyles, value }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 240, ...customStyles?.box }}>
      <TextField
        sx={{ width: "100%", ...customStyles?.textField }}
        id="outlined-basic"
        label={placeholder || "Filter by name..."}
        variant="outlined"
        onChange={onChange}
        value={value} // Добавлено для отображения текущего значения
      />
    </Box>
  );
};
