import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useSelector } from 'react-redux';

export default function MyPaper({ itemId, itemType }) {
    const item = useSelector((state) =>
        itemType === 'episode'
            ? state.episodes.items.find(ep => ep.id === itemId)
            : state.locations.items.find(loc => loc.id === itemId)
    );

    if (!item) return null;

    return (
        <Card sx={{
            width: "calc(100% / 4 - 20px * 3 / 4)",
        }}>
            <CardActionArea>
                <CardContent
                    sx={{
                        height: "128px",
                        padding: 1,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        backgroundColor: "#FAFAFA"
                    }}
                >
                    <Typography sx={{ margin: 0 }} gutterBottom variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', margin: 0 }}>
                        {item.type || item.episode}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', margin: 0 }}>
                        {item.dimension || item.air_date}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card >
    );
}