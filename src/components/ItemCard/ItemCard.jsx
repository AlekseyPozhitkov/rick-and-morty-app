import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useSelector } from "react-redux";
import { getItemById } from "../../libs/redux/selectors/itemsSelectors";
import { useNavigate } from "react-router-dom";

export const ItemCard = ({ itemId, itemType, showImage, customStyles }) => {
  const item = useSelector((state) => getItemById(state, itemId, itemType));
  const navigate = useNavigate(); // Инициализируем useNavigate

  const handleCardClick = () => {
    navigate(`/${itemType}/${itemId}`); // Переход на страницу персонажа
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "240px",
        boxShadow:
          "0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.20)",
      }}
      onClick={handleCardClick}
    >
      <CardActionArea>
        {showImage && (
          <CardMedia
            sx={{ maxHeight: "196px" }}
            component="img"
            image={item.image}
            alt={item.name}
          />
        )}
        <CardContent
          sx={{
            height: "100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
            {item.air_date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
