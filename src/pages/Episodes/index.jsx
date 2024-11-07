import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ItemCard } from "../../components/ItemCard";
import { ItemInput } from "../../components/ItemInput";
import { LoadMoreButton } from "../../components/LoadMoreButton";
import { Spinner } from "../../components/Spinner";
import { fetchEpisodes, setEpisodeFilter } from "../../libs/redux/slices/episodesSlice";
import logo from "../../public/rick-and-morty-eyes.svg";
import { pageStyles } from "../styles";

export default function Episodes() {
  const dispatch = useDispatch();
  const episodes = useSelector((state) => state.episodes.items);
  const status = useSelector((state) => state.episodes.status);
  const hasMore = useSelector((state) => state.episodes.hasMore); // Подключаем hasMore
  const filters = useSelector((state) => state.episodes.filters);
  const nextPage = useSelector((state) => state.episodes.nextPage);

  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false); // Флаг для отслеживание загрузки по кнопке
  const [initialLoad, setInitialLoad] = useState(true);

  // Загружаем фильтры из localStorage при первом рендере
  useEffect(() => {
    if (initialLoad) {
      const savedFilters = JSON.parse(localStorage.getItem("episodeFilters"));
      if (savedFilters) {
        Object.keys(savedFilters).forEach((key) => {
          dispatch(setEpisodeFilter({ [key]: savedFilters[key] }));
        });
      }
      // Первая загрузка эпизодов только после применения фильтров из localStorage
      dispatch(fetchEpisodes({ page: 1, filters: savedFilters || filters }));
      setInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, initialLoad]);

  // Загрузка эпизодов при изменении фильтров или страницы
  useEffect(() => {
    if (!initialLoad && status === "idle") {
      dispatch(fetchEpisodes({ page: nextPage, filters }));
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
    dispatch(fetchEpisodes({ page: nextPage, filters }));
  };

  const handleFilterChange = (value) => {
    const updatedFilters = { ...filters, name: value || "" };
    localStorage.setItem("episodeFilters", JSON.stringify(updatedFilters));
    dispatch(setEpisodeFilter({ name: value }));
    dispatch(fetchEpisodes({ page: 1, filters: updatedFilters })); // Перезагрузка с первой страницы
  };

  return (
    <>
      <Box component="img" src={logo} alt="rick-and-morty-eyes" sx={pageStyles.image} />

      <Stack sx={pageStyles.sorts} direction="row">
        <ItemInput
          value={filters.name || ""}
          onChange={(e) => handleFilterChange(e.target.value)}
          placeholder="Filter by name or episode (ex. S01 or S01E02)"
          sx={{ box: { maxWidth: "500px" } }}
        />
      </Stack>

      <Stack sx={pageStyles.items} direction="row">
        {status === "loading" && <Spinner />}
        {episodes.map((episode) => (
          <ItemCard
            key={episode.id}
            itemId={episode.id}
            itemType="episode"
            sx={{ cardContent: { height: "130px", justifyContent: "center", backgroundColor: "#FAFAFA" } }}
          />
        ))}
      </Stack>

      {status === "failed" && episodes.length === 0 && (
        <Typography sx={pageStyles.notFound}>Oops! Not found</Typography>
      )}

      {hasMore && status !== "loading" && !initialLoad && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}
