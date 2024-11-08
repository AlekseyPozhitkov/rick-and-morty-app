import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ItemCard } from "../../components/ItemCard";
import { Spinner } from "../../components/Spinner";
import { fetchLocationCharacters } from "../../libs/redux/slices/charactersSlice";
import { fetchLocationById } from "../../libs/redux/slices/locationDetailsSlice";
import { pageStyles } from "../styles";

export default function LocationDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { location, status: locationStatus, error } = useSelector((state) => state.locationDetails);
  const { items: characters, status: charactersStatus } = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(fetchLocationById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (location?.residents?.length > 0) {
      dispatch(fetchLocationCharacters(location.residents));
    }
  }, [dispatch, location]);

  if (locationStatus === "loading" || charactersStatus === "loading") {
    return <Spinner />;
  }

  if (locationStatus === "failed") {
    return <Typography>Error: {error}</Typography>;
  }

  if (!location) {
    return <Typography>No character data available</Typography>;
  }

  console.log(location);

  return (
    <Stack sx={{ ...pageStyles.details, gap: "0" }}>
      <Box onClick={() => navigate(-1)} sx={pageStyles.arrow}>
        <ArrowBackIcon sx={{ fontSize: "20px" }} />
        <Typography sx={{ fontWeight: "700", fontSize: "18px" }}>GO BACK</Typography>
      </Box>

      <Typography variant="h4" sx={{ marginBottom: "24px", textAlign: "center", marginTop: "-30px" }}>
        {location.name}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "center", marginBottom: "64px" }}>
        {["type", "dimension"].map((key) => {
          const displayValue = location[key] || "Unknown";

          return (
            <Stack sx={{ width: "100%", textAlign: "start", maxWidth: "240px" }} key={key}>
              <Typography sx={{ textTransform: "capitalize", ...pageStyles.stackTitle }}>{key}</Typography>
              <Typography sx={pageStyles.stackName}>{displayValue}</Typography>
            </Stack>
          );
        })}
      </Stack>
      <Typography sx={{ ...pageStyles.header, marginBottom: "24px" }}>Residents</Typography>

      <Box sx={pageStyles.items}>
        {characters.length > 0 ? (
          characters.map((character) => (
            <ItemCard key={character.id} itemId={character.id} itemType="character" showImage />
          ))
        ) : (
          <Typography variant="h4">No characters found on this location</Typography>
        )}
      </Box>
    </Stack>
  );
}
