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
  }, [nextPage, filters, dispatch, initialLoad, status]);

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
      {hasMore && status !== "loading" && !initialLoad && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}

export default Episodes;
