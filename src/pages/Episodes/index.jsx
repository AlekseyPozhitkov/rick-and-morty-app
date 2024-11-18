import { Box, Stack, Typography } from "@mui/material";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ItemCard } from "../../components/ItemCard";
import { ItemInput } from "../../components/ItemInput";
import { LoadMoreButton } from "../../components/LoadMoreButton";
import { Spinner } from "../../components/Spinner";
import {
  fetchEpisodes,
  resetEpisodes,
  setEpisodeFilter
} from "../../libs/redux/slices/episodesSlice";
import logo from "../../public/rick-and-morty-eyes.svg";
import { pageStyles } from "../styles";

// Выносим debounce за пределы компонента
const debouncedFetchByName = debounce((dispatch, filters, name) => {
  const updatedFilters = { ...filters, name };
  localStorage.setItem("episodeFilters", JSON.stringify(updatedFilters));
  dispatch(setEpisodeFilter({ name }));
  dispatch(fetchEpisodes({ page: 1, filters: updatedFilters }));
}, 700);

export default function Episodes() {
  const dispatch = useDispatch();
  const episodes = useSelector(state => state.episodes.items);
  const status = useSelector(state => state.episodes.status);
  const hasMore = useSelector(state => state.episodes.hasMore); // Подключаем hasMore
  const filters = useSelector(state => state.episodes.filters);
  const nextPage = useSelector(state => state.episodes.nextPage);
  const errorMessage = useSelector(state => state.episodes.errorMessage);

  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false); // Флаг для отслеживание загрузки по кнопке
  const [inputValue, setInputValue] = useState(filters.name || "");

  // Загружаем фильтры из localStorage при первом рендере
  useEffect(() => {
    dispatch(resetEpisodes()); // Сбрасываем состояние
    const savedFilters = JSON.parse(localStorage.getItem("episodeFilters"));
    if (savedFilters) {
      Object.keys(savedFilters).forEach(key => {
        dispatch(setEpisodeFilter({ [key]: savedFilters[key] }));
      });
      if (savedFilters.name) {
        setInputValue(savedFilters.name);
      }
    }
    dispatch(fetchEpisodes({ page: 1, filters: savedFilters || filters }));
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
    dispatch(fetchEpisodes({ page: nextPage, filters }));
  };

  const handleInputChange = e => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedFetchByName(dispatch, filters, newValue);
  };

  return (
    <>
      <Box component="img" src={logo} alt="rick-and-morty-eyes" sx={pageStyles.image} />

      <Stack sx={pageStyles.sorts} direction="row">
        <ItemInput
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Filter by name or episode (ex. S01 or S01E02)"
          sx={{ box: { maxWidth: { sm: "500px" } } }}
        />
      </Stack>

      <Stack sx={pageStyles.items} direction="row">
        {status === "loading" && <Spinner />}
        {episodes.map(episode => (
          <ItemCard
            key={episode.id}
            itemId={episode.id}
            itemType="episode"
            sx={{
              cardContent: { height: "130px", justifyContent: "center", backgroundColor: "#FAFAFA" }
            }}
          />
        ))}
      </Stack>

      {status === "failed" && episodes.length === 0 && (
        <Typography sx={pageStyles.notFound}>{errorMessage || "Oops! Not found"}</Typography>
      )}

      {hasMore && status !== "loading" && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}
