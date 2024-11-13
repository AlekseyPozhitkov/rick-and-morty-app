import { Box, Stack, Typography } from "@mui/material";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FiltersModal from "../../components/FiltersModal";
import { ItemCard } from "../../components/ItemCard";
import { ItemInput } from "../../components/ItemInput";
import { ItemSelect } from "../../components/ItemSelect";
import { LoadMoreButton } from "../../components/LoadMoreButton";
import { Spinner } from "../../components/Spinner";
import { fetchLocations, setLocationFilter } from "../../libs/redux/slices/locationsSlice";
import logo from "../../public/rick-and-morty-circle.svg";
import { pageStyles } from "../styles";

// Выносим debounce за пределы компонента
const debouncedFetchByName = debounce((dispatch, filters, name) => {
  const updatedFilters = { ...filters, name };
  localStorage.setItem("locationFilters", JSON.stringify(updatedFilters));
  dispatch(setLocationFilter({ name }));
  dispatch(fetchLocations({ page: 1, filters: updatedFilters }));
}, 700);

export default function Locations() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.items);
  const status = useSelector((state) => state.locations.status);
  const hasMore = useSelector((state) => state.locations.hasMore);
  const filterOptions = useSelector((state) => state.locations.filterOptions);
  const filters = useSelector((state) => state.locations.filters);
  const nextPage = useSelector((state) => state.locations.nextPage);
  const errorMessage = useSelector((state) => state.locations.errorMessage);

  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false); // Флаг для отслеживание загрузки по кнопке
  const [inputValue, setInputValue] = useState(filters.name || "");

  // Устанавливаем фильтры из localStorage при первом рендере
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("locationFilters"));
    if (savedFilters) {
      Object.keys(savedFilters).forEach((key) => {
        dispatch(setLocationFilter({ [key]: savedFilters[key] }));
      });
    }
    dispatch(fetchLocations({ page: 1, filters: savedFilters || filters }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedFetchByName(dispatch, filters, newValue);
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

      <Stack sx={pageStyles.sorts} direction={{ xs: "column", sm: "row" }}>
        <ItemInput
          value={inputValue}
          onChange={handleInputChange}
          sx={{ box: { maxWidth: { sm: "326px" } } }}
        />

        {["type", "dimension"].map((filterType) => (
          <ItemSelect
            key={filterType}
            label={filterType[0].toUpperCase() + filterType.slice(1)}
            options={filterOptions[filterType]}
            value={filters[filterType] || ""}
            onChange={(value) => handleFilterChange(filterType, value)}
            sx={{ box: { maxWidth: "240px" } }}
          />
        ))}

        <FiltersModal
          filterOptions={filterOptions}
          filters={filters}
          handleFilterChange={handleFilterChange}
          filterTypes={["type", "dimension"]}
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
        <Typography sx={pageStyles.notFound}>{errorMessage || "Oops! Not found"}</Typography>
      )}

      {hasMore && status !== "loading" && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}
