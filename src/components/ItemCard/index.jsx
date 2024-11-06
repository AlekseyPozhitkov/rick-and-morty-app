import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useSelector } from "react-redux";
import { getItemById } from "../../libs/redux/selectors/itemsSelectors";
import { useNavigate } from "react-router-dom";
import { cardStyles } from "./styles";

export const ItemCard = ({ itemId, itemType, showImage, sx, reverse }) => {
  const item = useSelector((state) => getItemById(state, itemId, itemType));
  const navigate = useNavigate(); // Инициализируем useNavigate

  const handleCardClick = () => {
    navigate(`/${itemType}/${itemId}`); // Переход на страницу персонажа
  };

  return (
    <Card
      sx={{
        ...cardStyles.card,
        ...sx?.card,
      }}
      onClick={handleCardClick}
    >
      <CardActionArea>
        {showImage && (
          <CardMedia sx={cardStyles.cardMedia} component="img" image={item.image} alt={item.name} />
        )}
        <CardContent sx={{ ...cardStyles.cardContent, ...sx?.cardContent }}>
          <Typography
            sx={{ ...cardStyles.typography, ...cardStyles.typographyTop, ...sx?.typographyTop }}
            gutterBottom
          >
            {reverse ? item.episode : item.name}
          </Typography>
          <Typography
            sx={{ ...cardStyles.typography, ...cardStyles.typographyMiddle, ...sx?.typographyMiddle }}
          >
            {reverse ? item.name : item.species || item.type || item.air_date}
          </Typography>
          <Typography
            sx={{ ...cardStyles.typography, ...cardStyles.typographyBottom, ...sx?.typographyBottom }}
          >
            {showImage ? "" : reverse ? item.air_date : item.episode}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
