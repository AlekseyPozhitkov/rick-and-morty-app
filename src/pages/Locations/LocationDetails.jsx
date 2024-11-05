import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLocationById } from "../../libs/redux/slices/locationDetailsSlice";
import { Spinner } from "../../components/Spinner/Spinner";
import { fetchLocationCharacters } from "../../libs/redux/slices/charactersSlice";
import { ItemCard } from "../../components/ItemCard/ItemCard";

function LocationDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { location, status: locationStatus, error } = useSelector((state) => state.locationDetails);
  const { items: characters, status: charactersStatus } = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(fetchLocationById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (location?.residents) {
      dispatch(fetchLocationCharacters(location.residents));
    }
  }, [dispatch, location]);

  if (locationStatus === "loading" || charactersStatus === "loading") {
    return <Spinner />;
  }

  if (locationStatus === "failed") {
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
      <div className="items">
        {characters.length > 0 ? (
          characters.map((character) => (
            <ItemCard key={character.id} itemId={character.id} itemType="character" showImage />
          ))
        ) : (
          <p>No characters found on this location</p>
        )}
      </div>
    </div>
  );
}

export default LocationDetails;
