import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ItemCard } from "../../components/ItemCard";
import { Spinner } from "../../components/Spinner";
import { fetchEpisodeCharacters } from "../../libs/redux/slices/charactersSlice";
import { fetchEpisodeById } from "../../libs/redux/slices/episodeDetailsSlice";
import { pageStyles } from "../styles";

export default function EpisodeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { episode, status: episodeStatus, error } = useSelector((state) => state.episodeDetails);
  const { items: characters, status: charactersStatus } = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(fetchEpisodeById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (episode?.characters) {
      dispatch(fetchEpisodeCharacters(episode.characters));
    }
  }, [dispatch, episode]);

  if (episodeStatus === "loading" || charactersStatus === "loading") {
    return <Spinner />;
  }

  if (episodeStatus === "failed") {
    return <Typography>Error: {error}</Typography>;
  }

  if (!episode) {
    return <Typography>No character data available</Typography>;
  }

  return (
    <Stack sx={{ ...pageStyles.details, gap: "0" }}>
      <Typography variant="h4" sx={{ marginBottom: "24px", textAlign: "center" }}>
        {episode.name}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "center", marginBottom: "64px" }}>
        {["episode", "air_date"].map((key) => {
          const displayValue = episode[key] || "Unknown";
          const displayKey = key === "air_date" ? "Date" : key;

          return (
            <Stack sx={{ width: "100%", textAlign: "start", maxWidth: "240px" }} key={key}>
              <Typography sx={{ textTransform: "capitalize", ...pageStyles.stackTitle }}>
                {displayKey}
              </Typography>
              <Typography sx={pageStyles.stackName}>{displayValue}</Typography>
            </Stack>
          );
        })}
      </Stack>
      <Typography sx={{ ...pageStyles.header, marginBottom: "24px" }}>Cast</Typography>

      <Box sx={pageStyles.items}>
        {characters.length > 0 ? (
          characters.map((character) => (
            <ItemCard key={character.id} itemId={character.id} itemType="character" showImage />
          ))
        ) : (
          <Typography>No characters found in this episode</Typography>
        )}
      </Box>
    </Stack>
  );
}
