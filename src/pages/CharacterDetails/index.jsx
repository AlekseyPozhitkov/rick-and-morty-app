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
import { detailsStyles } from "./styles";

export default function CharacterDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [episodes, setEpisodes] = useState([]);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);
  const [episodesError, setEpisodesError] = useState(null);

  // Получаем данные о персонаже и статус загрузки
  const { character, status, error } = useSelector((state) => state.characterDetails);

  useEffect(() => {
    dispatch(fetchCharacterById(id));
  }, [dispatch, id]);

  const resetEpisodesState = () => {
    setEpisodes([]);
    setEpisodesError(null);
    setIsLoadingEpisodes(false);
  };

  // Сбрасываем состояние эпизодов при изменении ID персонажа
  useEffect(() => {
    resetEpisodesState();
  }, [id]);

  // Загружаем информацию о каждом эпизоде
  useEffect(() => {
    let isMounted = true; // Флаг для контроля актуальности загрузки

    if (character?.episode && character.episode.length > 0) {
      const episodeIds = character.episode.map((url) => url.split("/").pop()).join(",");

      const fetchEpisodes = async () => {
        setIsLoadingEpisodes(true);

        try {
          const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`);

          if (isMounted) {
            setEpisodes(Array.isArray(response.data) ? response.data : [response.data]);
          }
        } catch (error) {
          setEpisodesError("Failed to load episodes."); // Устанавливаем текст ошибки
        } finally {
          if (isMounted) {
            setIsLoadingEpisodes(false);
          }
        }
      };

      fetchEpisodes();
    } else if (character?.episode?.length === 0) {
      // Обрабатываем случай, когда у персонажа нет эпизодов
      resetEpisodesState();
    }

    return () => {
      isMounted = false; // Устанавливаем флаг в false при размонтировании
    };
  }, [character]);

  // Обрабатываем состояние загрузки и ошибки
  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <Typography color="error">{error || "Failed to load character."}</Typography>;
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
        sx={{ ...pageStyles.image, ...detailsStyles.image }}
      />

      <Typography variant="h3" sx={detailsStyles.name}>
        {character.name}
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} sx={detailsStyles.informations}>
        <Stack sx={detailsStyles.stack}>
          <Typography sx={pageStyles.header}>Informations</Typography>
          {Object.entries(character).map(([key, value]) => {
            if (["id", "name", "image", "location", "episode", "url", "created"].includes(key)) {
              return null;
            }

            const displayValue =
              typeof value === "object" ? value.name || "Unknown" : value || "Unknown";

            return (
              <Box sx={pageStyles.boxItem} key={key}>
                <Typography sx={{ textTransform: "capitalize", ...pageStyles.boxTitle }}>
                  {key}
                </Typography>
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
            <ArrowForwardIosIcon sx={detailsStyles.arrow} />
          </Stack>
        </Stack>

        <Stack sx={detailsStyles.stack}>
          <Typography sx={pageStyles.header}>Episodes</Typography>
          <Box sx={detailsStyles.episodes}>
            {isLoadingEpisodes ? (
              <Typography>Loading...</Typography>
            ) : episodesError ? (
              <Typography color="error">{episodesError}</Typography>
            ) : episodes.length > 0 ? (
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
                    <Typography sx={detailsStyles.date}>{episode.air_date}</Typography>
                  </Box>
                  <ArrowForwardIosIcon sx={detailsStyles.arrow} />
                </Stack>
              ))
            ) : (
              <Typography>No episodes found</Typography>
            )}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
