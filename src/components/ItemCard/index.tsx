import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Card, CardActionArea, CardContent, CardMedia, SxProps, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../libs/redux/hooks";
import { selectCharacterById } from "../../libs/redux/slices/charactersSlice";
import { selectEpisodeById } from "../../libs/redux/slices/episodesSlice";
import { selectLocationById } from "../../libs/redux/slices/locationsSlice";
import { cardStyles } from "./styles";

interface Character {
  id: number;
  name: string;
  species?: string;
  gender?: string;
  status?: string;
  image?: string;
  episode?: string;
}

interface Location {
  id: number;
  name: string;
  type?: string;
  dimension?: string;
}

interface Episode {
  id: number;
  name: string;
  air_date?: string;
  episode?: string;
}

type Item = Character | Location | Episode;

type ItemType = "character" | "location" | "episode";

interface ItemCardProps {
  itemId: number | string;
  itemType: ItemType;
  showImage?: boolean;
  sx?: Record<string, SxProps>;
  reverse?: boolean;
  showArrow?: boolean;
  itemData?: Item;
}

export const ItemCard = ({
  itemId,
  itemType,
  showImage,
  sx,
  reverse,
  showArrow,
  itemData
}: ItemCardProps): JSX.Element => {
  const selectors = {
    character: selectCharacterById,
    location: selectLocationById,
    episode: selectEpisodeById
  };

  const itemFromRedux = useAppSelector((state) => selectors[itemType]?.(state, itemId));
  const item = itemData || itemFromRedux; // Приоритет у itemData

  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!itemData) {
      navigate(`/${itemType}/${itemId}`);
    }
  };

  return (
    <Card sx={{ ...cardStyles.card }} onClick={handleCardClick}>
      <CardActionArea sx={{ position: "relative" }}>
        {showImage && (
          <CardMedia sx={cardStyles.cardMedia} component="img" image={item.image} alt={item.name} />
        )}

        <CardContent sx={{ ...cardStyles.cardContent, ...sx }}>
          <Typography
            sx={{
              ...cardStyles.typography,
              color: "rgba(0, 0, 0, 0.9)",
              fontWeight: "700",
              fontSize: "20px"
            }}
            gutterBottom
          >
            {reverse ? item.episode : item.name}
          </Typography>
          <Typography sx={{ ...cardStyles.typography, fontWeight: "400" }}>
            {reverse ? item.name : item.species || item.type || item.air_date}
          </Typography>
          <Typography sx={{ ...cardStyles.typography, fontWeight: "700" }}>
            {showImage ? "" : reverse ? item.air_date : item.episode}
          </Typography>
        </CardContent>
        {showArrow && <ArrowForwardIosIcon sx={cardStyles.arrow} />}
      </CardActionArea>
    </Card>
  );
};
