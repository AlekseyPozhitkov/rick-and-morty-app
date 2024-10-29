import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, setLocationFilter } from "../../libs/redux/slices/locationsSlice";
import logo from "../../public/rick-and-morty-circle.svg";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import ItemCard from "../../components/ItemCard/ItemCard";
import MySelect from "../../components/Select/MySelect";
import MyInput from "../../components/Input/MyInput";
import Spinner from "../../components/Spinner/Spinner";

function Locations() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.items);
  const status = useSelector((state) => state.locations.status);
  const hasMore = useSelector((state) => state.locations.hasMore);
  const filterOptions = useSelector((state) => state.locations.filterOptions);
  const filters = useSelector((state) => state.locations.filters);
  const nextPage = useSelector((state) => state.locations.nextPage);
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLocations({ page: nextPage, filters }));
    }
  }, [status, nextPage, filters, dispatch]);

  const onLoadMore = () => {
    dispatch(fetchLocations({ page: nextPage, filters }));
  };

  const handleFilterChange = (filterType, value) => {
    dispatch(setLocationFilter({ [filterType]: value }));
    dispatch(fetchLocations({ page: 1, filters: { ...filters, [filterType]: value } }));
  };

  return (
    <>
      <img src={logo} alt="rick-and-morty-circle" />
      <div>
        <MyInput
          onChange={(e) => handleFilterChange("name", e.target.value)}
          customStyles={{ box: { width: "30%" } }}
        />
        <MySelect
          label="Type"
          options={filterOptions.type}
          onChange={(value) => handleFilterChange("type", value)}
          customStyles={{ box: { width: "20%" } }}
        />
        <MySelect
          label="Dimension"
          options={filterOptions.dimension}
          onChange={(value) => handleFilterChange("dimension", value)}
          customStyles={{ box: { width: "20%" } }}
        />
      </div>
      <div>
        {status === "loading" && <Spinner />}
        {locations.map((location) => (
          <ItemCard
            key={location.id}
            itemId={location.id}
            itemType="location"
            showImage={false}
            customStyles={{
              cardContent: { height: "130px", justifyContent: "center", backgroundColor: "#FAFAFA" },
            }}
          />
        ))}
      </div>
      {status === "failed" && <div>Oops! Not found</div>}
      {hasMore && status !== "loading" && <LoadMoreButton onClick={onLoadMore} />}
    </>
  );
}

export default Locations;
