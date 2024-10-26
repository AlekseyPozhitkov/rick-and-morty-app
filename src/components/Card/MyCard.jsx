import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useSelector } from 'react-redux';

export default function MyCard({ characterId }) {
    const character = useSelector((state) =>
        state.characters.items.find((char) => char.id === characterId)
    );

    if (!character) return null;

    return (
        <Card sx={{
            width: "calc(100% / 4 - 20px * 3 / 4)",
        }}>
            <CardActionArea>
                <CardMedia
                    sx={{
                        padding: 0,
                        margin: 0,
                        height: "230px"

                    }}
                    component="img"
                    image={character.image}
                    alt={character.name}
                />
                <CardContent
                    sx={{
                        height: "90px",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly"
                    }}
                >
                    <Typography sx={{ margin: 0 }} gutterBottom variant="h5" component="div">
                        {character.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', margin: 0 }}>
                        {character.species}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}