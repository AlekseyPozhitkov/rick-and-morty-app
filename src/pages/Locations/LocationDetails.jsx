import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLocationById } from "../../libs/redux/slices/locationDetailsSlice";
import { Spinner } from "../../components/Spinner/Spinner";
import { fetchCharacters } from "../../libs/redux/slices/charactersSlice";
import { ItemCard } from "../../components/ItemCard/ItemCard";

function LocationDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { location, status: locationStatus, error } = useSelector((state) => state.locationDetails);
  const { items: characters, status: charactersStatus } = useSelector((state) => state.characters);

  // Загружаем данные локации при первом рендере
  useEffect(() => {
    dispatch(fetchLocationById(id));
  }, [dispatch, id]);

  // Загружаем персонажей, если их нет в хранилище
  useEffect(() => {
    if (characters.length === 0) {
      dispatch(fetchCharacters({ page: 1, filters: {} }));
    }
  }, [dispatch, characters.length]);

  // Отфильтровываем персонажей, основываясь на списке residents у локации
  const locationCharacters = useMemo(() => {
    if (!location?.residents) return [];
    const residentIds = location.residents.map((url) => url.split("/").pop());
    return characters.filter((character) => residentIds.includes(String(character.id)));
  }, [location, characters]);

  // Обработка состояния загрузки и ошибок
  if (locationStatus === "loading" || (charactersStatus === "loading" && locationCharacters.length === 0)) {
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
        {locationCharacters.length > 0 ? (
          locationCharacters.map((card) => (
            <ItemCard key={card.id} itemId={card.id} itemType="character" showImage />
          ))
        ) : (
          <p>No characters found on this location</p>
        )}
      </div>
    </div>
  );
}

export default LocationDetails;
