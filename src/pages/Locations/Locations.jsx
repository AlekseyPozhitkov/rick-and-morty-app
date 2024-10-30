import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, setLocationFilter } from "../../libs/redux/slices/locationsSlice";
import logo from "../../public/rick-and-morty-circle.svg";
import { LoadMoreButton } from "../../components/LoadMoreButton/LoadMoreButton";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { ItemSelect } from "../../components/ItemSelect/ItemSelect";
import { ItemInput } from "../../components/ItemInput/ItemInput";
import { Spinner } from "../../components/Spinner/Spinner";

function Locations() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.items);
  const status = useSelector((state) => state.locations.status);
  const hasMore = useSelector((state) => state.locations.hasMore);
  const filterOptions = useSelector((state) => state.locations.filterOptions);
  const filters = useSelector((state) => state.locations.filters);
  const nextPage = useSelector((state) => state.locations.nextPage);

  // Устанавливаем фильтры из localStorage при первом рендере
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("locationFilters"));
    if (savedFilters) {
      Object.keys(savedFilters).forEach((key) => {
        dispatch(setLocationFilter({ [key]: savedFilters[key] }));
      });
    }
    // Устанавливаем флаг, что фильтры загружены
    dispatch(fetchLocations({ page: 1, filters: savedFilters || {} }));
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLocations({ page: 1, filters }));
    }
  }, [status, filters, dispatch]);

  const onLoadMore = () => {
    dispatch(fetchLocations({ page: nextPage, filters }));
  };

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value || "" };
    // Сохраняем фильтры в localStorage
    localStorage.setItem("locationFilters", JSON.stringify(updatedFilters));
    dispatch(setLocationFilter({ [filterType]: value || "" }));
    dispatch(fetchLocations({ page: 1, filters: updatedFilters }));
  };

  return (
    <>
      <img className="image" src={logo} alt="rick-and-morty-circle" />
      <div className="sorts sortsLocations">
        <ItemInput
          value={filters.name || ""}
          onChange={(e) => handleFilterChange("name", e.target.value)}
          customStyles={{ box: { maxWidth: "325px" } }}
        />
        <ItemSelect
          label="Type"
          options={filterOptions.type}
          value={filters.type || ""}
          onChange={(value) => handleFilterChange("type", value)}
        />
        <ItemSelect
          label="Dimension"
          options={filterOptions.dimension}
          value={filters.dimension || ""}
          onChange={(value) => handleFilterChange("dimension", value)}
        />
      </div>
      <div className="items">
        {status === "loading" && <Spinner />}
        {locations.map((location) => (
          <ItemCard
            key={location.id}
            itemId={location.id}
            itemType="location"
            customStyles={{
              cardContent: {
                height: "130px",
                backgroundColor: "#FAFAFA",
              },
            }}
          />
        ))}
      </div>
      {status === "failed" && locations.length === 0 && (
        <div className="notFound">Oops! Not found</div>
      )}
      {hasMore && status !== "loading" && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}

export default Locations;
