import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ItemCard } from "../../components/ItemCard";
import { ItemInput } from "../../components/ItemInput";
import { ItemSelect } from "../../components/ItemSelect";
import { LoadMoreButton } from "../../components/LoadMoreButton";
import { Spinner } from "../../components/Spinner";
import { fetchLocations, setLocationFilter } from "../../libs/redux/slices/locationsSlice";
import logo from "../../public/rick-and-morty-circle.svg";
import { pageStyles } from "../styles";

export default function Locations() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.items);
  const status = useSelector((state) => state.locations.status);
  const hasMore = useSelector((state) => state.locations.hasMore);
  const filterOptions = useSelector((state) => state.locations.filterOptions);
  const filters = useSelector((state) => state.locations.filters);
  const nextPage = useSelector((state) => state.locations.nextPage);

  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false); // Флаг для отслеживание загрузки по кнопке
  const [initialLoad, setInitialLoad] = useState(true);

  // Устанавливаем фильтры из localStorage при первом рендере
  useEffect(() => {
    if (initialLoad) {
      const savedFilters = JSON.parse(localStorage.getItem("locationFilters"));
      if (savedFilters) {
        Object.keys(savedFilters).forEach((key) => {
          dispatch(setLocationFilter({ [key]: savedFilters[key] }));
        });
      }
      // Первая загрузка эпизодов только после применения фильтров из localStorage
      dispatch(fetchLocations({ page: 1, filters: savedFilters || filters }));
      setInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, initialLoad]);

  // Загрузка эпизодов при изменении фильтров или страницы
  useEffect(() => {
    if (!initialLoad && status === "idle") {
      dispatch(fetchLocations({ page: nextPage, filters }));
    }
  }, [dispatch, filters, nextPage, status, initialLoad]);

  // Скролл вниз после загрузки при нажатии LOAD MORE
  useEffect(() => {
    if (isLoadMoreClicked && status === "succeeded") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      setIsLoadMoreClicked(false); // Сбрасываем флаг после выполнения скролла
    }
  }, [status, isLoadMoreClicked]);

  const onLoadMore = () => {
    setIsLoadMoreClicked(true); // Устанавливаем флаг для активации скролла
    dispatch(fetchLocations({ page: nextPage, filters }));
  };

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value || "" };
    localStorage.setItem("locationFilters", JSON.stringify(updatedFilters));
    dispatch(setLocationFilter({ [filterType]: value || "" }));
    dispatch(fetchLocations({ page: 1, filters: updatedFilters }));
  };

  return (
    <>
      <Box component="img" src={logo} alt="rick-and-morty-circle" sx={pageStyles.image} />

      <Stack sx={pageStyles.sorts} direction="row">
        <ItemInput
          value={filters.name || ""}
          onChange={(e) => handleFilterChange("name", e.target.value)}
          sx={{ box: { maxWidth: "326px" } }}
        />
        <ItemSelect
          label="Type"
          options={filterOptions.type}
          value={filters.type || ""}
          onChange={(value) => handleFilterChange("type", value)}
        />
        <ItemSelect
          label="Dimension"
          options={filterOptions.dimension}
          value={filters.dimension || ""}
          onChange={(value) => handleFilterChange("dimension", value)}
        />
      </Stack>

      <Stack sx={pageStyles.items} direction="row">
        {status === "loading" && <Spinner />}
        {locations.map((location) => (
          <ItemCard
            key={location.id}
            itemId={location.id}
            itemType="location"
            sx={{
              cardContent: {
                height: "130px",
                backgroundColor: "#FAFAFA"
              }
            }}
          />
        ))}
      </Stack>

      {status === "failed" && locations.length === 0 && (
        <Typography sx={pageStyles.notFound}>Oops! Not found</Typography>
      )}

      {hasMore && status !== "loading" && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}
