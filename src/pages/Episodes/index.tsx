import { Box, Stack, Typography } from "@mui/material";
import debounce from "lodash/debounce";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

import { ItemCard } from "../../components/ItemCard";
import { ItemInput } from "../../components/ItemInput";
import { LoadMoreButton } from "../../components/LoadMoreButton";
import { Spinner } from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchEpisodes,
  resetEpisodes,
  setEpisodeFilter
} from "../../libs/redux/slices/episodesSlice";
import logo from "../../public/rick-and-morty-eyes.svg";
import { pageStyles } from "../styles";

export default function Episodes() {
  const dispatch = useAppDispatch();
  const { items, status, hasMore, filters, nextPage, error } = useAppSelector(
    (state) => state.episodes
  );

  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false); // Флаг для отслеживание загрузки по кнопке
  const [inputValue, setInputValue] = useState(filters.name || "");

  // дебаунс
  const debouncedFetchByName = useMemo(
    () =>
      debounce((name: string) => {
        const updatedFilters = { ...filters, name };
        localStorage.setItem("episodeFilters", JSON.stringify(updatedFilters));
        dispatch(setEpisodeFilter({ name }));
        dispatch(fetchEpisodes({ page: 1, filters: updatedFilters }));
      }, 700),
    [dispatch, filters]
  );

  // Загружаем фильтры из localStorage при первом рендере
  useEffect(() => {
    dispatch(resetEpisodes()); // Сбрасываем состояние
    const savedFilters = JSON.parse(localStorage.getItem("episodeFilters") || "{}");
    if (savedFilters) {
      Object.keys(savedFilters).forEach((key) => {
        dispatch(setEpisodeFilter({ [key]: savedFilters[key] }));
      });
      if (savedFilters.name) {
        setInputValue(savedFilters.name);
      }
    }
    dispatch(fetchEpisodes({ page: 1, filters: savedFilters || filters }));
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
    dispatch(fetchEpisodes({ page: nextPage, filters }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedFetchByName(newValue);
  };

  return (
    <>
      <Box component="img" src={logo} alt="rick-and-morty-eyes" sx={pageStyles.image} />

      <Stack sx={pageStyles.sorts} direction="row">
        <ItemInput
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Filter by name or episode (ex. S01 or S01E02)"
          sx={{ maxWidth: { sm: "500px" } }}
        />
      </Stack>

      <Box sx={pageStyles.items}>
        {status === "loading" && <Spinner />}
        {items.map((episode) => (
          <ItemCard
            key={episode.id}
            itemId={episode.id}
            itemType="episode"
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
