import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Stack, Typography } from "@mui/material";
import { mergeSx } from "merge-sx";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { GoBackButton } from "../../components/GoBackButton";
import { Spinner } from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchCharacterById } from "../../libs/redux/slices/characterDetailsSlice";
import { pageStyles } from "../styles";
import { detailsStyles } from "./styles";

export default function CharacterDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { character, episodes, status, error } = useAppSelector((state) => state.characterDetails);

  useEffect(() => {
    if (id) {
      dispatch(fetchCharacterById(Number(id)));
    }
  }, [dispatch, id]);

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
