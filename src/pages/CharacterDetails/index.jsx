import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { GoBackButton } from "../../components/GoBackButton";
import { Spinner } from "../../components/Spinner";
import { fetchCharacterById } from "../../libs/redux/slices/characterDetailsSlice";
import { pageStyles } from "../styles";
import { detailsStyles, itemCard } from "./styles";

export default function CharacterDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [episodes, setEpisodes] = useState([]);

  // Получаем данные о персонаже и статус загрузки
  const { character, status, error } = useSelector((state) => state.characterDetails);

  useEffect(() => {
    dispatch(fetchCharacterById(id));
  }, [dispatch, id]);

  // Загружаем информацию о каждом эпизоде
  useEffect(() => {
    if (character?.episode) {
      const fetchEpisodes = async () => {
        try {
          const episodePromises = character.episode.map((url) => axios.get(url));
          const responses = await Promise.all(episodePromises);
          setEpisodes(responses.map((res) => res.data));
        } catch (error) {
          console.error("Failed to load episodes:", error);
        }
      };
      fetchEpisodes();
    }
  }, [character]);

  // Обрабатываем состояние загрузки и ошибки
  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <Typography>Error loading character: {error}</Typography>;
  }

  if (!character) {
    return <Typography>No character data available</Typography>;
  }

  return (
    <Stack sx={{ ...pageStyles.details, gap: "0" }}>
      <GoBackButton />

      <Box
        component="img"
        src={character.image}
        alt={character.name}
        sx={{
          ...pageStyles.image,
          borderRadius: "50%",
          maxWidth: { xs: "200px", sm: "300px" },
          marginTop: { xs: "0", sm: "-50px" }
        }}
      />

      <Typography
        variant="h3"
        sx={{ marginBottom: { xs: "32px", sm: "42px" }, fontSize: { xs: "32px", sm: "48px" } }}
      >
        {character.name}
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "center", gap: { xs: "50px" } }}>
        <Stack sx={detailsStyles.stack}>
          <Typography sx={{ ...pageStyles.header }}>Informations</Typography>
          {Object.entries(character).map(([key, value]) => {
            if (["id", "name", "image", "location", "episode", "url", "created"].includes(key)) {
              return null;
            }

            const displayValue = typeof value === "object" ? value.name || "Unknown" : value || "Unknown";

            return (
              <Box sx={pageStyles.boxItem} key={key}>
                <Typography sx={{ textTransform: "capitalize", ...pageStyles.boxTitle }}>{key}</Typography>
                <Typography sx={pageStyles.boxName}>{displayValue}</Typography>
              </Box>
            );
          })}

          <Stack
            component={Link}
            to={`/location/${character.location.url.split("/").pop()}`}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ ...pageStyles.boxItem, ...detailsStyles.link }}
          >
            <Box>
              <Typography sx={pageStyles.boxTitle}>Location</Typography>
              <Typography sx={pageStyles.boxName}>{character.location.name}</Typography>
            </Box>
            <ArrowForwardIosIcon sx={{ color: "#8E8E93", margin: "5px", fontSize: "15px" }} />
          </Stack>
        </Stack>

        <Stack sx={detailsStyles.stack}>
          <Typography sx={{ ...pageStyles.header }}>Episodes</Typography>
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
                <Stack
                  component={Link}
                  key={episode.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  to={`/episode/${episode.id}`}
                  sx={{ ...pageStyles.boxItem, ...detailsStyles.link }}
                >
                  <Box>
                    <Typography sx={pageStyles.boxTitle}>{episode.episode}</Typography>
                    <Typography sx={pageStyles.boxName}>{episode.name}</Typography>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "10px",
                        textTransform: "uppercase",
                        color: "#8E8E93",
                        letterSpacing: "1.5px"
                      }}
                    >
                      {episode.air_date}
                    </Typography>
                  </Box>
                  <ArrowForwardIosIcon sx={{ color: "#8E8E93", marginLeft: "5px" }} />
                </Stack>
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
