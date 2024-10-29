import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useSelector } from "react-redux";
import { getItemById } from "../../libs/redux/selectors/itemsSelectors";

export default function ItemCard({ itemId, itemType, showImage, customStyles }) {
  const item = useSelector((state) => getItemById(state, itemId, itemType));

  return (
    <Card>
      <CardActionArea>
        {showImage && (
          <CardMedia
            sx={{
              padding: 0,
              margin: 0,
              height: "230px",
            }}
            component="img"
            image={item.image}
            alt={item.name}
          />
        )}
        <CardContent
          sx={{
            height: "90px",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            ...customStyles?.cardContent,
          }}
        >
          <Typography sx={{ margin: 0 }} gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", margin: 0 }}>
            {item.species || item.type || item.episode}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", margin: 0 }}>
            {item.dimension || item.air_date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
