import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function TripleSelect() {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div style={{
            padding: "0 30%",
            display: "flex",
            justifyContent: "center",
            gap: 20,
            marginBottom: 20
        }}
        >
            <Box
                component="form"
                sx={{ width: "calc(100% / 3)" }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    sx={{
                        width: "100%"
                    }}
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                />
            </Box>
            <Box sx={{
                width: "calc(100% / 4 - 10px * 3 / 4)",
            }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{
                width: "calc(100% / 4 - 10px * 3 / 4)",
            }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    );
}