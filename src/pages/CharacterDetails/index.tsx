import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Stack, Typography } from "@mui/material";
import { mergeSx } from "merge-sx";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { axiosInstance } from "../../axiosInstance";
import { GoBackButton } from "../../components/GoBackButton";
import { Spinner } from "../../components/Spinner";
import { StatusBlock } from "../../components/StatusBlock";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchCharacterById } from "../../libs/redux/slices/characterDetailsSlice";
import { pageStyles } from "../styles";
import { detailsStyles } from "./styles";

interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

export default function CharacterDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { character, status, error } = useAppSelector((state) => state.characterDetails);

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoadingEpisodes] = useState(false);
  const [episodesError, setEpisodesError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchCharacterById(Number(id)));
    }
  }, [dispatch, id]);

  const resetEpisodesState = () => {
    setEpisodes([]);
    setEpisodesError(null);
    setIsLoadingEpisodes(false);
  };

  useEffect(() => {
    resetEpisodesState(); // Сбрасываем состояние эпизодов при изменении ID персонажа
  }, [id]);

  useEffect(() => {
    let isMounted = true; // Флаг для контроля актуальности загрузки

    if (character?.episode && character.episode.length > 0) {
      const episodeIds = character.episode.map((url) => url.split("/").pop()).join(",");

      const fetchEpisodes = async () => {
        setIsLoadingEpisodes(true);

        try {
          const response = await axiosInstance.get<Episode[] | Episode>(`/episode/${episodeIds}`);

          if (isMounted) {
            setEpisodes(Array.isArray(response.data) ? response.data : [response.data]);
          }
        } catch (error) {
          setEpisodesError("Failed to load episodes.");
        } finally {
          if (isMounted) {
            setIsLoadingEpisodes(false);
          }
        }
      };

      fetchEpisodes();
    } else if (character?.episode?.length === 0) {
      resetEpisodesState(); // Если эпизодов нет, сбрасываем состояние.
    }

    return () => {
      isMounted = false; // Отменяем обновления при размонтировании
    };
  }, [character]);

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
        sx={mergeSx(pageStyles.image, detailsStyles.image)}
      />

      <Typography variant="h3" sx={detailsStyles.name}>
        {character.name}
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} sx={detailsStyles.informations}>
        <Stack sx={detailsStyles.stack}>
          <Typography sx={pageStyles.header}>Informations</Typography>
          {(["gender", "status", "species", "origin", "type"] as const).map((key) => {
            const value = character[key];
            const displayValue =
              typeof value === "object" && value !== null && "name" in value
                ? value.name || "Unknown"
                : value || "Unknown";

            return (
              <Box sx={pageStyles.boxItem} key={key}>
                <Typography sx={{ ...pageStyles.boxTitle, textTransform: "capitalize" }}>
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
            sx={mergeSx(pageStyles.boxItem, detailsStyles.link)}
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
            <StatusBlock
              isLoading={isLoading}
              error={episodesError}
              dataLength={episodes.length}
              noDataMessage="No episodes"
            />

            {episodes.map((episode) => (
              <Stack
                component={Link}
                key={episode.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                to={`/episode/${episode.id}`}
                sx={mergeSx(pageStyles.boxItem, detailsStyles.link)}
              >
                <Box>
                  <Typography sx={pageStyles.boxTitle}>{episode.episode}</Typography>
                  <Typography sx={pageStyles.boxName}>{episode.name}</Typography>
                  <Typography sx={detailsStyles.date}>{episode.air_date}</Typography>
                </Box>

                <ArrowForwardIosIcon sx={detailsStyles.arrow} />
              </Stack>
            ))}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
