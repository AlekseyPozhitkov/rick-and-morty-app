import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ItemCard } from "../../components/ItemCard";
import { Spinner } from "../../components/Spinner";
import { fetchCharacterById } from "../../libs/redux/slices/characterDetailsSlice";
import { fetchCharacterEpisodes } from "../../libs/redux/slices/episodesSlice";
import { pageStyles } from "../styles";
import { detailsStyles, itemCard } from "./styles";

export default function CharacterDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получаем данные о персонаже и статус загрузки
  const { character, status: characterStatus, error } = useSelector((state) => state.characterDetails);
  const { items: episodes, status: episodesStatus } = useSelector((state) => state.episodes);

  useEffect(() => {
    dispatch(fetchCharacterById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (character?.episode?.length > 0) {
      dispatch(fetchCharacterEpisodes(character.episode));
    }
  }, [dispatch, character]);

  // Обрабатываем состояние загрузки и ошибки
  if (characterStatus === "loading" || episodesStatus === "loading") {
    return <Spinner />;
  }

  if (characterStatus === "failed") {
    return <Typography>Error: {error}</Typography>;
  }

  if (!character) {
    return <Typography>No character data available</Typography>;
  }

  return (
    <Stack sx={{ ...pageStyles.details, gap: "0" }}>
      <Box onClick={() => navigate(-1)} sx={pageStyles.arrow}>
        <ArrowBackIcon sx={{ fontSize: "20px" }} />
        <Typography sx={{ fontWeight: "700", fontSize: "18px" }}>GO BACK</Typography>
      </Box>

      <Box
        component="img"
        src={character.image}
        alt={character.name}
        sx={{ ...pageStyles.image, borderRadius: "50%", maxWidth: "300px", marginTop: "-50px" }}
      />

      <Typography variant="h3" sx={{ marginBottom: "42px" }}>
        {character.name}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        <Stack sx={detailsStyles.stack}>
          <Typography sx={{ ...pageStyles.header, marginBottom: "35px" }}>Informations</Typography>
          {Object.entries(character).map(([key, value]) => {
            if (["id", "name", "image", "location", "episode", "url", "created"].includes(key)) {
              return null;
            }

            const displayValue = typeof value === "object" ? value.name || "Unknown" : value || "Unknown";

            return (
              <Stack sx={pageStyles.stackItem} key={key}>
                <Typography sx={{ textTransform: "capitalize", ...pageStyles.stackTitle }}>{key}</Typography>
                <Typography sx={pageStyles.stackName}>{displayValue}</Typography>
              </Stack>
            );
          })}

          <Stack
            component={Link}
            to={`/location/${character.location.url.split("/").pop()}`}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              textDecoration: "none",
              color: "inherit",
              borderRadius: "5px",
              "&:hover": { backgroundColor: "#f6f6f6" },
              ...pageStyles.stackText
            }}
          >
            <Stack sx={pageStyles.stackItem}>
              <Typography sx={pageStyles.stackTitle}>Location</Typography>
              <Typography sx={pageStyles.stackName}>{character.location.name}</Typography>
            </Stack>
            <ArrowForwardIosIcon sx={{ color: "#8E8E93", margin: "5px", fontSize: "15px" }} />
          </Stack>
        </Stack>

        <Stack sx={detailsStyles.stack}>
          <Typography sx={{ ...pageStyles.header, marginBottom: "35px" }}>Episodes</Typography>
          <Box
            sx={{
              maxHeight: "352px",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                display: "none"
              }
            }}
          >
            {episodes.length > 0 ? (
              episodes.map((episode) => (
                <ItemCard
                  key={episode.id}
                  itemId={episode.id}
                  itemType="episode"
                  sx={itemCard}
                  reverse
                  showArrow
                />
              ))
            ) : (
              <Typography>No episodes</Typography> // Сообщение, если у персонажа нет эпизодов
            )}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}