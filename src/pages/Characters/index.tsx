import { Box, Stack, Typography } from "@mui/material";
import debounce from "lodash/debounce";
import { ChangeEvent, useEffect, useState } from "react";

import { FiltersModal } from "../../components/FiltersModal";
import { ItemCard } from "../../components/ItemCard";
import { ItemInput } from "../../components/ItemInput";
import { ItemSelect } from "../../components/ItemSelect";
import { LoadMoreButton } from "../../components/LoadMoreButton";
import { Spinner } from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import {
  CharactersState,
  fetchCharacters,
  resetCharacters,
  setCharacterFilter
} from "../../libs/redux/slices/charactersSlice";
import logo from "../../public/RICKANDMORTY.svg";
import { pageStyles } from "../styles";

const debouncedFetchCharacters = debounce(
  (
    dispatch: ReturnType<typeof useAppDispatch>,
    filters: CharactersState["filters"],
    name: string
  ) => {
    const updatedFilters = { ...filters, name };
    localStorage.setItem("characterFilters", JSON.stringify(updatedFilters));
    dispatch(setCharacterFilter({ name }));
    dispatch(fetchCharacters({ page: 1, filters: updatedFilters }));
  },
  700
);

export default function Characters() {
  const dispatch = useAppDispatch();
  const { items, status, hasMore, filters, filterOptions, nextPage, error } = useAppSelector(
    (state) => state.characters
  );

  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false);
  const [inputValue, setInputValue] = useState(filters.name || "");

  // Устанавливаем фильтры из localStorage при первом рендере
  useEffect(() => {
    dispatch(resetCharacters());
    const savedFilters = JSON.parse(localStorage.getItem("characterFilters") || "{}");
    if (savedFilters) {
      Object.keys(savedFilters).forEach((key) => {
        dispatch(setCharacterFilter({ [key]: savedFilters[key] }));
      });
      if (savedFilters.name) {
        setInputValue(savedFilters.name);
      }
    }
    dispatch(fetchCharacters({ page: 1, filters: savedFilters || filters }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (isLoadMoreClicked && status === "succeeded") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      setIsLoadMoreClicked(false); // Сбрасываем флаг после выполнения скролла
    }
  }, [status, isLoadMoreClicked]);

  const onLoadMore = () => {
    setIsLoadMoreClicked(true); // Устанавливаем флаг для активации скролла
    dispatch(fetchCharacters({ page: nextPage, filters }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedFetchCharacters(dispatch, filters, newValue);
  };

  const handleFilterChangeOnMainPage = (
    filterType: keyof CharactersState["filters"],
    value: string | null
  ) => {
    const updatedFilters = { ...filters, [filterType]: value || "" };
    localStorage.setItem("characterFilters", JSON.stringify(updatedFilters));
    dispatch(setCharacterFilter({ [filterType]: value || "" }));
    dispatch(fetchCharacters({ page: 1, filters: updatedFilters }));
  };

  return (
    <>
      <Box component="img" src={logo} alt="RICKANDMORTY" sx={pageStyles.image} />

      <Stack sx={pageStyles.sorts} direction="row">
        <ItemInput value={inputValue} onChange={handleInputChange} />

        {(["species", "gender", "status"] as const).map((filterType) => (
          <ItemSelect
            key={filterType}
            label={filterType[0].toUpperCase() + filterType.slice(1)}
            options={filterOptions[filterType]}
            value={filters[filterType] || ""}
            onChange={(value) => handleFilterChangeOnMainPage(filterType, value)}
          />
        ))}
      </Stack>

      <FiltersModal
        filterOptions={filterOptions}
        filters={{ ...filters }}
        handleFilterChange={(updatedFilters) => {
          localStorage.setItem("characterFilters", JSON.stringify(updatedFilters));
          dispatch(setCharacterFilter(updatedFilters));
          dispatch(fetchCharacters({ page: 1, filters: { ...filters, ...updatedFilters } }));
        }}
        filterTypes={["species", "gender", "status"]}
      />

      <Box sx={pageStyles.items}>
        {status === "loading" && <Spinner />}
        {items.map((card) => (
          <ItemCard key={card.id} itemId={card.id} itemType="character" showImage />
        ))}
      </Box>

      {status === "failed" && items.length === 0 && (
        <Typography sx={pageStyles.notFound}>{error || "Oops! Not found"}</Typography>
      )}

      {hasMore && status !== "loading" && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}
