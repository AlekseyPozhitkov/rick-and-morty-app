import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCharacterById } from "../../libs/redux/slices/charactersSlice";
import { selectEpisodeById } from "../../libs/redux/slices/episodesSlice";
import { selectLocationById } from "../../libs/redux/slices/locationsSlice";
import { cardStyles } from "./styles";

export const ItemCard = ({ itemId, itemType, showImage, sx, reverse, showArrow, itemData }) => {
  const selectors = {
    character: selectCharacterById,
    location: selectLocationById,
    episode: selectEpisodeById
  };

  const itemFromRedux = useSelector(state => selectors[itemType]?.(state, itemId));
  const item = itemData || itemFromRedux; // Приоритет у itemData

  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!itemData) {
      navigate(`/${itemType}/${itemId}`);
    }
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
            sx={{
              ...cardStyles.typography,
              ...cardStyles.typographyMiddle,
              ...sx?.typographyMiddle
            }}
          >
            {reverse ? item.name : item.species || item.type || item.air_date}
          </Typography>
          <Typography
            sx={{
              ...cardStyles.typography,
              ...cardStyles.typographyBottom,
              ...sx?.typographyBottom
            }}
          >
            {showImage ? "" : reverse ? item.air_date : item.episode}
          </Typography>
        </CardContent>
        {showArrow && <ArrowForwardIosIcon sx={cardStyles.arrow} />}
      </CardActionArea>
    </Card>
  );
};
