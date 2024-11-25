import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { axiosInstance } from "../../axiosInstance";
import { GoBackButton } from "../../components/GoBackButton";
import { ItemCard } from "../../components/ItemCard";
import { Spinner } from "../../components/Spinner";
import { StatusBlock } from "../../components/StatusBlock";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { fetchLocationById } from "../../libs/redux/slices/locationDetailsSlice";
import { pageStyles } from "../styles";
import { detailsStyles } from "./styles";

interface Resident {
  id: number;
  name: string;
  species: string;
  gender: string;
  status: string;
}

export default function LocationDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { location, status, error } = useAppSelector((state) => state.locationDetails);

  const [residents, setResidents] = useState<Resident[]>([]);
  const [isLoading, setIsLoadingResidents] = useState(false);
  const [residentsError, setResidentsError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchLocationById(Number(id)));
  }, [dispatch, id]);

  const resetResidentsState = () => {
    setResidents([]);
    setResidentsError(null);
    setIsLoadingResidents(false);
  };

  useEffect(() => {
    resetResidentsState(); // Сбрасываем состояние немедленно при смене ID
  }, [id]);

  useEffect(() => {
    let isMounted = true; // Флаг для контроля актуальности загрузки

    if (location?.residents && location.residents.length > 0) {
      const residentIds = location.residents.map((url) => url.split("/").pop()).join(",");

      const fetchResidents = async () => {
        setIsLoadingResidents(true);

        try {
          const response = await axiosInstance.get<Resident[] | Resident>(
            `/character/${residentIds}`
          );

          if (isMounted) {
            setResidents(Array.isArray(response.data) ? response.data : [response.data]);
          }
        } catch (error) {
          setResidentsError("Failed to load residents.");
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

      <StatusBlock
        isLoading={isLoading}
        error={residentsError}
        dataLength={residents.length}
        noDataMessage="No residents found in this location"
      />

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
