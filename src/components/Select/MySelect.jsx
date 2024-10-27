import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MySelect({ label, options, onChange }) {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setValue(selectedValue);
        onChange(selectedValue);
    };

    return (
        <Box sx={{ width: "calc(100% / 4 - 10px * 3 / 4)" }}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select sx={{ textAlign: "left" }} value={value} label={label} onChange={handleChange}>
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