import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function AloneInput() {
    return (
        <Box
            component="form"
            sx={{
                width: "500px",
                margin: "0 auto 65px",
            }}
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
    );
}