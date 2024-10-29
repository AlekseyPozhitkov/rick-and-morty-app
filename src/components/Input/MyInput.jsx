import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function MyInput({ onChange, placeholder, customStyles }) {
  return (
    <Box
      component="form"
      sx={{
        ...customStyles?.box,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        sx={{
          width: "100%",
          ...customStyles?.textField,
        }}
        id="outlined-basic"
        label={placeholder || "Filter by name..."}
        variant="outlined"
        onChange={onChange}
      />
    </Box>
  );
}
