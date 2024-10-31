import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters, setCharacterFilter } from "../../libs/redux/slices/charactersSlice";
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

  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false); // Флаг для отслеживание загрузки по кнопке

  // Устанавливаем фильтры из localStorage при первом рендере
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("characterFilters"));
    if (savedFilters) {
      Object.keys(savedFilters).forEach((key) => {
        dispatch(setCharacterFilter({ [key]: savedFilters[key] }));
      });
    }
    // Загружаем персонажей после применения фильтров
    dispatch(fetchCharacters({ page: 1, filters: savedFilters || {} }));
  }, [dispatch]);

  // Следим за изменениями фильтров и загружаем персонажей
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters({ page: 1, filters }));
    }
  }, [filters, status, dispatch]);

  // Скроллим, если данные загружены после нажатия на кнопку "LOAD MORE"
  useEffect(() => {
    if (isLoadMoreClicked && status === "succeeded") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      setIsLoadMoreClicked(false); // Сбрасываем флаг после выполнения скролла
    }
  }, [characters, status, isLoadMoreClicked]);

  const onLoadMore = () => {
    setIsLoadMoreClicked(true); // Устанавливаем флаг для активации скролла
    dispatch(fetchCharacters({ page: nextPage, filters }));
  };

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value || "" };
    // Сохраняем фильтры в localStorage
    localStorage.setItem("characterFilters", JSON.stringify(updatedFilters));
    dispatch(setCharacterFilter({ [filterType]: value || "" }));
    dispatch(fetchCharacters({ page: 1, filters: updatedFilters }));
  };

  return (
    <>
      <img className="image" src={logo} alt="RICKANDMORTY" />
      <div className="sorts">
        <ItemInput
          value={filters.name || ""}
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
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
      </div>
      <div className="items">
        {status === "loading" && <Spinner />}
        {characters.map((card) => (
          <ItemCard key={card.id} itemId={card.id} itemType="character" showImage customStyles />
        ))}
      </div>
      {status === "failed" && characters.length === 0 && (
        <div className="notFound">Oops! Not found</div>
      )}
      {hasMore && status !== "loading" && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}

export default Characters;
