import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEpisodes, setEpisodeFilter } from "../../libs/redux/slices/episodesSlice";
import logo from "../../public/rick-and-morty-eyes.svg";
import { LoadMoreButton } from "../../components/LoadMoreButton/LoadMoreButton";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { ItemInput } from "../../components/ItemInput/ItemInput";
import { Spinner } from "../../components/Spinner/Spinner";

function Episodes() {
  const dispatch = useDispatch();
  const episodes = useSelector((state) => state.episodes.items);
  const status = useSelector((state) => state.episodes.status);
  const hasMore = useSelector((state) => state.episodes.hasMore); // Подключаем hasMore
  const filters = useSelector((state) => state.episodes.filters);
  const nextPage = useSelector((state) => state.episodes.nextPage);

  // Устанавливаем фильтры из localStorage при первом рендере
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("episodeFilters"));
    if (savedFilters) {
      Object.keys(savedFilters).forEach((key) => {
        dispatch(setEpisodeFilter({ [key]: savedFilters[key] }));
      });
    }
    // Загружаем персонажей после применения фильтров
    dispatch(fetchEpisodes({ page: 1, filters: savedFilters || {} }));
  }, [dispatch]);

  // Следим за изменениями фильтров и загружаем персонажей
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEpisodes({ page: 1, filters }));
    }
  }, [status, filters, dispatch]);

  const onLoadMore = () => {
    dispatch(fetchEpisodes({ page: nextPage, filters }));
  };

  const handleFilterChange = (value) => {
    const updatedFilters = { ...filters, name: value || "" };
    // Сохраняем фильтры в localStorage
    localStorage.setItem("episodeFilters", JSON.stringify(updatedFilters));
    dispatch(setEpisodeFilter({ name: value }));
    dispatch(fetchEpisodes({ page: 1, filters: updatedFilters }));
  };

  return (
    <>
      <img className="image" src={logo} alt="rick-and-morty-eyes" />
      <div className="sorts sortsEpisodes">
        <ItemInput
          value={filters.name || ""}
          onChange={(e) => handleFilterChange(e.target.value)}
          placeholder="Filter by name or episode (ex. S01 or S01E02)"
          customStyles={{ box: { maxWidth: "500px" } }}
        />
      </div>
      <div className="items">
        {status === "loading" && <Spinner />}
        {episodes.map((episode) => (
          <ItemCard
            key={episode.id}
            itemId={episode.id}
            itemType="episode"
            customStyles={{
              cardContent: {
                height: "130px",
                justifyContent: "center",
                backgroundColor: "#FAFAFA",
              },
            }}
          />
        ))}
      </div>
      {status === "failed" && episodes.length === 0 && (
        <div className="notFound">Oops! Not found</div>
      )}
      {hasMore && status !== "loading" && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}

export default Episodes;
