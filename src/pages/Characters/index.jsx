import { Box, Stack, Typography } from "@mui/material";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ItemCard } from "../../components/ItemCard";
import { ItemInput } from "../../components/ItemInput";
import { ItemSelect } from "../../components/ItemSelect";
import { LoadMoreButton } from "../../components/LoadMoreButton";
import { Spinner } from "../../components/Spinner";
import { fetchCharacters, setCharacterFilter } from "../../libs/redux/slices/charactersSlice";
import logo from "../../public/RICKANDMORTY.svg";
import { pageStyles } from "../styles";

// Выносим debounce за пределы компонента
const debouncedFetchByName = debounce((dispatch, filters, name) => {
  const updatedFilters = { ...filters, name };
  localStorage.setItem("characterFilters", JSON.stringify(updatedFilters));
  dispatch(setCharacterFilter({ name }));
  dispatch(fetchCharacters({ page: 1, filters: updatedFilters }));
}, 700);

export default function Characters() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.items);
  const status = useSelector((state) => state.characters.status);
  const hasMore = useSelector((state) => state.characters.hasMore);
  const filters = useSelector((state) => state.characters.filters);
  const filterOptions = useSelector((state) => state.characters.filterOptions);
  const nextPage = useSelector((state) => state.characters.nextPage);
  const errorMessage = useSelector((state) => state.characters.errorMessage);

  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false); // Флаг для отслеживания загрузки по кнопке
  const [inputValue, setInputValue] = useState(filters.name || "");

  // Инициализация фильтров из localStorage при первом рендере
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("characterFilters"));
    if (savedFilters) {
      Object.keys(savedFilters).forEach((key) => {
        dispatch(setCharacterFilter({ [key]: savedFilters[key] }));
      });
    }
    dispatch(fetchCharacters({ page: 1, filters: savedFilters || filters }));
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
    dispatch(fetchCharacters({ page: nextPage, filters }));
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedFetchByName(dispatch, filters, newValue); // Только поиск по имени
  };

  const handleFilterChange = (filterType, value) => {
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
        <ItemSelect
          label="Species"
          options={filterOptions.species}
          value={filters.species || ""}
          onChange={(value) => handleFilterChange("species", value)}
        />
        <ItemSelect
          label="Gender"
          options={filterOptions.gender}
          value={filters.gender || ""}
          onChange={(value) => handleFilterChange("gender", value)}
        />
        <ItemSelect
          label="Status"
          options={filterOptions.status}
          value={filters.status || ""}
          onChange={(value) => handleFilterChange("status", value)}
        />
      </Stack>

      <Stack sx={pageStyles.items} direction="row">
        {status === "loading" && <Spinner />}
        {characters.map((card) => (
          <ItemCard key={card.id} itemId={card.id} itemType="character" showImage />
        ))}
      </Stack>

      {status === "failed" && characters.length === 0 && (
        <Typography sx={pageStyles.notFound}>{errorMessage || "Oops! Not found"}</Typography>
      )}

      {hasMore && status !== "loading" && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}
