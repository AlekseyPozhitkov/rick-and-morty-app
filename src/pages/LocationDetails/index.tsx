import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { GoBackButton } from "../../components/GoBackButton";
import { ItemCard } from "../../components/ItemCard";
import { Spinner } from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchLocationById } from "../../libs/redux/slices/locationDetailsSlice";
import { pageStyles } from "../styles";
import { detailsStyles } from "./styles";

export default function LocationDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { location, residents, status, error } = useAppSelector((state) => state.locationDetails);

  useEffect(() => {
    dispatch(fetchLocationById(Number(id)));
  }, [dispatch, id]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <Typography color="error">{error || "Failed to load location."}</Typography>;
  }

  if (!location) {
    return <Typography>No character data available</Typography>;
  }

  return (
    <>
      <Stack sx={{ ...pageStyles.details, gap: "0" }}>
        <GoBackButton />

        <Typography variant="h4" sx={detailsStyles.name}>
          {location.name}
        </Typography>

        <Stack direction="row" sx={detailsStyles.title}>
          {(["type", "dimension"] as const).map((key) => {
            const displayValue = location[key] || "Unknown";

            return (
              <Box sx={detailsStyles.titlePart} key={key}>
                <Typography sx={{ ...pageStyles.boxTitle, textTransform: "capitalize" }}>
                  {key}
                </Typography>
                <Typography sx={pageStyles.boxName}>{displayValue}</Typography>
              </Box>
            );
          })}
        </Stack>

        <Typography sx={{ ...pageStyles.header, marginBottom: "24px" }}>Residents</Typography>
      </Stack>

      <Stack sx={pageStyles.items}>
        {residents.map((resident) => (
          <Stack component={Link} to={`/character/${resident.id}`} key={resident.id}>
            <ItemCard itemId={resident.id} itemType="character" itemData={resident} showImage />
          </Stack>
        ))}
      </Stack>
    </>
  );
}
