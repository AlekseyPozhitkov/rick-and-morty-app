import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function MyCard({ name, type, episode, date }) {
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
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', margin: 0 }}>
                        {type}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', margin: 0 }}>
                        {date}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', margin: 0 }}>
                        {episode}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card >
    );
}