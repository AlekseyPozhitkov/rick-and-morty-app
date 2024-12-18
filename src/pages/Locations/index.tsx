import { Box, Stack, Typography } from "@mui/material";
import debounce from "lodash/debounce";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { FiltersModal } from "../../components/FiltersModal";
import { ItemCard } from "../../components/ItemCard";
import { ItemInput } from "../../components/ItemInput";
import { ItemSelect } from "../../components/ItemSelect";
import { LoadMoreButton } from "../../components/LoadMoreButton";
import { Spinner } from "../../components/Spinner";
import { getFromLocalStorage } from "../../helpers/getFromLocalStorage";
import { setToLocalStorage } from "../../helpers/setToLocalStorage";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  Filters,
  LocationsState,
  fetchLocations,
  setLocationFilter
} from "../../libs/redux/slices/locationsSlice";
import logo from "../../public/rick-and-morty-circle.svg";
import { pageStyles } from "../styles";

export default function Locations() {
  const dispatch = useAppDispatch();
  const { items, status, hasMore, filterOptions, filters, nextPage, error } = useAppSelector(
    (state) => state.locations
  );

  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false);
  const [inputValue, setInputValue] = useState(filters.name || "");

  // Дебаунс
  const debouncedFetchByName = useCallback(
    debounce((name: string) => {
      const updatedFilters = { ...filters, name };
      setToLocalStorage("locationFilters", updatedFilters);

      dispatch(setLocationFilter({ name }));
      dispatch(fetchLocations({ page: 1, filters: updatedFilters }));
    }, 700),
    [filters]
  );

  // Загрузка данных
  useEffect(() => {
    const savedFilters = getFromLocalStorage<Filters>("locationFilters");
    if (savedFilters) {
      dispatch(setLocationFilter(savedFilters));
      savedFilters.name && setInputValue(savedFilters.name);
    }

    dispatch(fetchLocations({ page: 1, filters: savedFilters }));
  }, [dispatch]);

  useEffect(() => {
    if (isLoadMoreClicked && status === "succeeded") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      setIsLoadMoreClicked(false);
    }
  }, [status, isLoadMoreClicked]);

  const onLoadMore = () => {
    setIsLoadMoreClicked(true);
    dispatch(fetchLocations({ page: nextPage, filters }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedFetchByName(newValue);
  };

  const handleFilterChangeOnMainPage = (
    filterType: keyof LocationsState["filters"],
    value: string | null
  ) => {
    const updatedFilters = { ...filters, [filterType]: value || "" };
    setToLocalStorage("locationFilters", updatedFilters);

    dispatch(setLocationFilter({ [filterType]: value || "" }));
    dispatch(fetchLocations({ page: 1, filters: updatedFilters }));
  };

  return (
    <>
      <Box component="img" src={logo} alt="rick-and-morty-circle" sx={pageStyles.image} />

      <Stack sx={pageStyles.sorts} direction="row">
        <ItemInput
          value={inputValue}
          onChange={handleInputChange}
          sx={{ maxWidth: { sm: "326px" } }}
        />

        {(["type", "dimension"] as const).map((filterType) => (
          <ItemSelect
            key={filterType}
            label={filterType[0].toUpperCase() + filterType.slice(1)}
            options={filterOptions[filterType]}
            value={filters[filterType] || ""}
            onChange={(value) => handleFilterChangeOnMainPage(filterType, value)}
            sx={{ maxWidth: "240px" }}
          />
        ))}
      </Stack>

      <FiltersModal
        filterOptions={filterOptions}
        filters={{ ...filters }}
        handleFilterChange={(updatedFilters) => {
          setToLocalStorage("locationFilters", updatedFilters);

          dispatch(setLocationFilter(updatedFilters));
          dispatch(fetchLocations({ page: 1, filters: { ...filters, ...updatedFilters } }));
        }}
        filterTypes={["type", "dimension"]}
      />

      <Box sx={pageStyles.items}>
        {status === "loading" && <Spinner />}
        {items.map((location) => (
          <ItemCard
            key={location.id}
            itemId={location.id}
            itemType="location"
            sx={{ height: "130px", backgroundColor: "#FAFAFA" }}
          />
        ))}
      </Box>

      {status === "failed" && items.length === 0 && (
        <Typography sx={pageStyles.notFound}>{error || "Oops! Not found"}</Typography>
      )}

      {hasMore && status !== "loading" && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}
