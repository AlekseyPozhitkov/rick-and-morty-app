import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Card, CardActionArea, CardContent, CardMedia, SxProps, Typography } from "@mui/material";
import { mergeSx } from "merge-sx";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../hooks/reduxHooks";
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
  itemId: number;
  itemType: ItemType;
  showImage?: boolean;
  sx?: SxProps;
  showArrow?: boolean;
  itemData?: Item;
}

export const ItemCard = ({
  itemId,
  itemType,
  showImage,
  sx,
  showArrow,
  itemData
}: ItemCardProps) => {
  const selectors = {
    character: selectCharacterById,
    location: selectLocationById,
    episode: selectEpisodeById
  };

  const itemFromRedux = useAppSelector((state) => selectors[itemType]?.(state, itemId));
  const item = itemData || itemFromRedux;

  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!itemData) {
      navigate(`/${itemType}/${itemId}`);
    }
  };

  if (!item) return null;

  const isCharacter = (item: Item): item is Character => (item as Character).image !== undefined;
  const isLocation = (item: Item): item is Location => (item as Location).type !== undefined;
  const isEpisode = (item: Item): item is Episode => (item as Episode).air_date !== undefined;

  return (
    <Card sx={cardStyles.card} onClick={handleCardClick}>
      <CardActionArea sx={{ position: "relative" }}>
        {showImage && isCharacter(item) && (
          <CardMedia sx={cardStyles.cardMedia} component="img" image={item.image} alt={item.name} />
        )}

        <CardContent sx={mergeSx(cardStyles.cardContent, sx)}>
          <Typography sx={mergeSx(cardStyles.typography, cardStyles.typographyTitle)} gutterBottom>
            {item.name}
          </Typography>

          <Typography sx={{ ...cardStyles.typography, fontWeight: "400" }}>
            {isCharacter(item) && item.species}
            {isLocation(item) && item.type}
            {isEpisode(item) && item.air_date}
          </Typography>

          <Typography sx={{ ...cardStyles.typography, fontWeight: "700" }}>
            {isEpisode(item) && item.episode}
          </Typography>
        </CardContent>
        {showArrow && <ArrowForwardIosIcon sx={cardStyles.arrow} />}
      </CardActionArea>
    </Card>
  );
};
