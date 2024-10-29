import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEpisodes, setFilter } from "../../libs/redux/slices/episodesSlice";
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
  const nextPage = useSelector((state) => state.episodes.nextPage);
  const filters = useSelector((state) => state.episodes.filters);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEpisodes({ page: nextPage, filters }));
    }
  }, [status, nextPage, filters, dispatch]);

  const onLoadMore = () => {
    dispatch(fetchEpisodes({ page: nextPage, filters }));
  };

  const handleFilterChange = (value) => {
    dispatch(setFilter({ name: value }));
    dispatch(fetchEpisodes({ page: 1, filters: { ...filters, name: value } }));
  };

  return (
    <>
      <img className="image" src={logo} alt="rick-and-morty-eyes" />
      <div className="sorts sortsEpisodes">
        <ItemInput
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
      {status === "failed" && <div className="notFound">Oops! Not found</div>}
      {hasMore && status !== "loading" && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}

export default Episodes;
