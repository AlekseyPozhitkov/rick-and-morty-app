import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MyInput({ onChange }) {
    return (
        <Box
            component="form"
            sx={{
                width: "calc(100% / 4 - 10px * 3 / 4)",
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                sx={{
                    width: "100%"
                }}
                id="outlined-basic"
                label="Filter by name..."
                variant="outlined"
                onChange={onChange}
            />
        </Box>
    );
}