import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { axiosInstance } from "../../axiosInstance";
import { GoBackButton } from "../../components/GoBackButton";
import { ItemCard } from "../../components/ItemCard";
import { Spinner } from "../../components/Spinner";
import { StatusBlock } from "../../components/StatusBlock";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchEpisodeById } from "../../libs/redux/slices/episodeDetailsSlice";
import { detailsStyles } from "../LocationDetails/styles";
import { pageStyles } from "../styles";

interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  status: string;
}

export default function EpisodeDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { episode, status, error } = useAppSelector((state) => state.episodeDetails);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoadingCharacters] = useState(false);
  const [charactersError, setCharactersError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchEpisodeById(Number(id)));
  }, [dispatch, id]);

  const resetCharactersState = () => {
    setCharacters([]);
    setCharactersError(null);
    setIsLoadingCharacters(false);
  };

  useEffect(() => {
    resetCharactersState(); // Сбрасываем состояние немедленно при смене ID
  }, [id]);

  useEffect(() => {
    let isMounted = true; // Флаг для контроля актуальности загрузки

    if (episode?.characters && episode.characters.length > 0) {
      const characterIds = episode.characters.map((url) => url.split("/").pop()).join(",");

      const fetchCharacters = async () => {
        setIsLoadingCharacters(true);

        try {
          const response = await axiosInstance.get<Character[] | Character>(
            `/character/${characterIds}`
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
      resetCharactersState(); // Если нет жителей, сбрасываем состояние
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
          {(["episode", "air_date"] as const).map((key) => {
            const displayValue = episode[key] || "Unknown";
            const displayKey = key === "air_date" ? "Date" : key;

            return (
              <Box sx={detailsStyles.titlePart} key={key}>
                <Typography sx={{ ...pageStyles.boxTitle, textTransform: "capitalize" }}>
                  {displayKey}
                </Typography>
                <Typography sx={pageStyles.boxName}>{displayValue}</Typography>
              </Box>
            );
          })}
        </Stack>

        <Typography sx={{ ...pageStyles.header, marginBottom: "24px" }}>Cast</Typography>
      </Stack>

      <StatusBlock
        isLoading={isLoading}
        error={charactersError}
        dataLength={characters.length}
        noDataMessage="No episodes found in this location"
      />

      <Stack sx={pageStyles.items}>
        {characters.map((character) => (
          <Box component={Link} to={`/character/${character.id}`} key={character.id}>
            <ItemCard itemId={character.id} itemType="character" itemData={character} showImage />
          </Box>
        ))}
      </Stack>
    </>
  );
}
