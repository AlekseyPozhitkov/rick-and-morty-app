import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getItemById } from "../../libs/redux/selectors/itemsSelectors";
import { cardStyles } from "./styles";

export const ItemCard = ({ itemId, itemType, showImage, sx, reverse, showArrow }) => {
  const item = useSelector((state) => getItemById(state, itemId, itemType));
  const navigate = useNavigate(); // Инициализируем useNavigate

  const handleCardClick = () => {
    navigate(`/${itemType}/${itemId}`); // Переход на страницу персонажа
  };

  return (
    <Card
      sx={{
        ...cardStyles.card,
        ...sx?.card
      }}
      onClick={handleCardClick}
    >
      <CardActionArea sx={{ position: "relative" }}>
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
        {showArrow && (
          <ArrowForwardIosIcon
            sx={{
              fontSize: "15px",
              color: "#8E8E93",
              position: "absolute",
              right: "10px",
              margin: "5px",
              top: "calc(50% - 5px)",
              transform: "translateY(-50%)"
            }}
          />
        )}
      </CardActionArea>
    </Card>
  );
};
