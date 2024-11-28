import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { GoBackButton } from "../../components/GoBackButton";
import { ItemCard } from "../../components/ItemCard";
import { Spinner } from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchEpisodeById } from "../../libs/redux/slices/episodeDetailsSlice";
import { detailsStyles } from "../LocationDetails/styles";
import { pageStyles } from "../styles";

export default function EpisodeDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { episode, characters, status, error } = useAppSelector((state) => state.episodeDetails);

  useEffect(() => {
    dispatch(fetchEpisodeById(Number(id)));
  }, [dispatch, id]);

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
