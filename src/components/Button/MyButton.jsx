import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '@fontsource/roboto/500.css';

export default function MyButton({ onClick }) {
    return (
        <Stack>
            <Button sx={{
                width: 155,
                height: 35,
                margin: "40px auto",
                backgroundColor: "#F2F9FE",
                color: "#2196F3",
                font: "Roboto",
                fontWeight: 500,
                fontSize: 14,

            }}
                variant="contained"
                onClick={onClick} // Передаем onClick в кнопку
            >
                Load more
            </Button>
        </Stack>
    );
}