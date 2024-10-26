import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function MyCard({ photo, name, species }) {
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
                    image={photo}
                    alt={name}
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
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', margin: 0 }}>
                        {species}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}