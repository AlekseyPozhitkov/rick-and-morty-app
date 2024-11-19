import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { GoBackButton } from "../../components/GoBackButton";
import { ItemCard } from "../../components/ItemCard";
import { Spinner } from "../../components/Spinner";
import { fetchLocationById } from "../../libs/redux/slices/locationDetailsSlice";
import { pageStyles } from "../styles";
import { detailsStyles } from "./styles";

export default function LocationDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { location, status, error } = useSelector((state) => state.locationDetails);

  const [residents, setResidents] = useState([]);
  const [isLoadingResidents, setIsLoadingResidents] = useState(false);
  const [residentsError, setResidentsError] = useState(null);

  useEffect(() => {
    dispatch(fetchLocationById(id));
  }, [dispatch, id]);

  const resetResidentsState = () => {
    setResidents([]);
    setResidentsError(null);
    setIsLoadingResidents(false);
  };

  useEffect(() => {
    // Сбрасываем состояние немедленно при смене ID
    resetResidentsState();
  }, [id]);

  useEffect(() => {
    let isMounted = true; // Флаг для контроля актуальности загрузки

    if (location?.residents && location.residents.length > 0) {
      const residentIds = location.residents.map((url) => url.split("/").pop()).join(",");

      const fetchResidents = async () => {
        setIsLoadingResidents(true);

        try {
          const response = await axios.get(
            `https://rickandmortyapi.com/api/character/${residentIds}`
          );

          if (isMounted) {
            setResidents(Array.isArray(response.data) ? response.data : [response.data]);
          }
        } catch (error) {
          setResidentsError("Failed to load residents."); // Устанавливаем текст ошибки
        } finally {
          if (isMounted) {
            setIsLoadingResidents(false);
          }
        }
      };

      fetchResidents();
    } else if (location?.residents?.length === 0) {
      resetResidentsState(); // Если нет жителей, сбрасываем состояние
    }

    return () => {
      isMounted = false; // Отменяем обновления при размонтировании
    };
  }, [location]);

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
          {["type", "dimension"].map((key) => {
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

      {isLoadingResidents ? (
        <Typography>Loading...</Typography>
      ) : residentsError ? (
        <Typography color="error">{residentsError}</Typography>
      ) : !isLoadingResidents && residents.length === 0 ? (
        <Typography sx={pageStyles.notFound}>No residents found in this location</Typography>
      ) : (
        <Stack sx={pageStyles.items}>
          {residents.map((resident) => (
            <Stack component={Link} to={`/character/${resident.id}`} key={resident.id}>
              <ItemCard itemData={resident} showImage />
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
}
