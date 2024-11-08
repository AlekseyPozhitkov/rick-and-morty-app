import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCharacterById } from "../../libs/redux/slices/charactersSlice";
import { selectEpisodeById } from "../../libs/redux/slices/episodesSlice";
import { selectLocationById } from "../../libs/redux/slices/locationsSlice";
import { cardStyles } from "./styles";

export const ItemCard = ({ itemId, itemType, showImage, sx, reverse, showArrow }) => {
  const selectors = {
    character: selectCharacterById,
    location: selectLocationById,
    episode: selectEpisodeById
  };
  const item = useSelector((state) => selectors[itemType]?.(state, itemId));

  const navigate = useNavigate();

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
