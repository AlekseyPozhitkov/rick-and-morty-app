import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters, setFilter } from "../../libs/redux/slices/charactersSlice";
import logo from "../../public/RICKANDMORTY.svg";
import { LoadMoreButton } from "../../components/LoadMoreButton/LoadMoreButton";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { ItemSelect } from "../../components/ItemSelect/ItemSelect";
import { ItemInput } from "../../components/ItemInput/ItemInput";
import { Spinner } from "../../components/Spinner/Spinner";

function Characters() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.items);
  const status = useSelector((state) => state.characters.status);
  const hasMore = useSelector((state) => state.characters.hasMore);
  const filters = useSelector((state) => state.characters.filters);
  const filterOptions = useSelector((state) => state.characters.filterOptions);
  const nextPage = useSelector((state) => state.characters.nextPage);

  useEffect(() => {
    if (status === "idle") {
      // Загружаем данные при первом рендере
      dispatch(fetchCharacters({ page: nextPage, filters }));
    }
  }, [status, nextPage, filters, dispatch]);

  const onLoadMore = () => {
    dispatch(fetchCharacters({ page: nextPage, filters }));
  };

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilter({ [filterType]: value }));
    dispatch(fetchCharacters({ page: 1, filters: { ...filters, [filterType]: value } }));
  };

  return (
    <>
      <img className="image" src={logo} alt="RICKANDMORTY" />
      <div className="sorts">
        <ItemInput onChange={(e) => handleFilterChange("name", e.target.value)} />
        <ItemSelect
          label="Species"
          options={filterOptions.species}
          onChange={(value) => handleFilterChange("species", value)}
        />
        <ItemSelect
          label="Gender"
          options={filterOptions.gender}
          onChange={(value) => handleFilterChange("gender", value)}
        />
        <ItemSelect
          label="Status"
          options={filterOptions.status}
          onChange={(value) => handleFilterChange("status", value)}
        />
      </div>
      <div className="items">
        {status === "loading" && <Spinner />}
        {characters.map((card) => (
          <ItemCard key={card.id} itemId={card.id} itemType="character" showImage customStyles />
        ))}
      </div>
      {status === "failed" && <div>Oops! Not found</div>}
      {hasMore && status !== "loading" && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}

export default Characters;
