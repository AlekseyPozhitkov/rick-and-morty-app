import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { GoBackButton } from "../../components/GoBackButton";
import { ItemCard } from "../../components/ItemCard";
import { Spinner } from "../../components/Spinner";
import { fetchEpisodeById } from "../../libs/redux/slices/episodeDetailsSlice";
import { detailsStyles } from "../LocationDetails/styles";
import { pageStyles } from "../styles";

export default function EpisodeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { episode, status, error } = useSelector((state) => state.episodeDetails);

  const [characters, setCharacters] = useState([]);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [charactersError, setCharactersError] = useState(null);

  useEffect(() => {
    dispatch(fetchEpisodeById(id));
  }, [dispatch, id]);

  const resetCharactersState = () => {
    setCharacters([]);
    setCharactersError(null);
    setIsLoadingCharacters(false);
  };

  useEffect(() => {
    resetCharactersState();
  }, [id]);

  useEffect(() => {
    let isMounted = true; // Флаг для контроля актуальности загрузки

    if (episode?.characters && episode.characters.length > 0) {
      const characterIds = episode.characters.map((url) => url.split("/").pop()).join(",");

      const fetchCharacters = async () => {
        setIsLoadingCharacters(true);

        try {
          const response = await axios.get(
            `https://rickandmortyapi.com/api/character/${characterIds}`
          );

          if (isMounted) {
            setCharacters(Array.isArray(response.data) ? response.data : [response.data]);
          }
        } catch (error) {
          setCharactersError("Failed to load characters.");
        } finally {
          if (isMounted) {
            setIsLoadingCharacters(false);
          }
        }
      };

      fetchCharacters();
    } else if (episode?.characters?.length === 0) {
      resetCharactersState();
    }

    return () => {
      isMounted = false; // Отменяем обновления при размонтировании
    };
  }, [episode]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <Typography color="error">{error || "Failed to load episode."}</Typography>;
  }

  if (!episode) {
    return <Typography>No character data available</Typography>;
  }

  return (
    <>
      <Stack sx={{ ...pageStyles.details, gap: "0" }}>
        <GoBackButton />

        <Typography variant="h4" sx={detailsStyles.name}>
          {episode.name}
        </Typography>

        <Stack direction="row" sx={detailsStyles.title}>
          {["episode", "air_date"].map((key) => {
            const displayValue = episode[key] || "Unknown";
            const displayKey = key === "air_date" ? "Date" : key;

            return (
              <Box sx={detailsStyles.titlePart} key={key}>
                <Typography sx={{ textTransform: "capitalize", ...pageStyles.boxTitle }}>
                  {displayKey}
                </Typography>
                <Typography sx={pageStyles.boxName}>{displayValue}</Typography>
              </Box>
            );
          })}
        </Stack>

        <Typography sx={{ ...pageStyles.header, marginBottom: "24px" }}>Cast</Typography>
      </Stack>

      {isLoadingCharacters ? (
        <Typography>Loading...</Typography>
      ) : charactersError ? (
        <Typography color="error">{charactersError}</Typography>
      ) : characters.length > 0 ? (
        <Stack sx={pageStyles.items}>
          {characters.map((character) => (
            <Stack component={Link} to={`/character/${character.id}`} key={character.id}>
              <ItemCard itemData={character} showImage />
            </Stack>
          ))}
        </Stack>
      ) : (
        <Typography sx={pageStyles.notFound}>No characters found in this episode</Typography>
      )}
    </>
  );
}
