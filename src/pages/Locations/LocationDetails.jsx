import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLocationById } from "../../libs/redux/slices/locationDetailsSlice";
import { Spinner } from "../../components/Spinner/Spinner";

function LocationDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { location, status, error } = useSelector((state) => state.locationDetails);

  useEffect(() => {
    dispatch(fetchLocationById(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!location) {
    return <div>No character data available</div>;
  }

  return (
    <div>
      <h1>{location.name}</h1>
      <p>Type: {location.type}</p>
      <p>Dimension: {location.dimension}</p>
    </div>
  );
}

export default LocationDetails;
