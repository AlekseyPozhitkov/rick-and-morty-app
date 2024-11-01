import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEpisodeById } from "../../libs/redux/slices/episodeDetailsSlice";
import { Spinner } from "../../components/Spinner/Spinner";
import { fetchCharacters } from "../../libs/redux/slices/charactersSlice";
import { ItemCard } from "../../components/ItemCard/ItemCard";

function EpisodeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { episode, status: episodeStatus, error } = useSelector((state) => state.episodeDetails);
  const { items: characters, status: charactersStatus } = useSelector((state) => state.characters);

  // Загружаем данные локации при первом рендере
  useEffect(() => {
    dispatch(fetchEpisodeById(id));
  }, [dispatch, id]);

  // Загружаем персонажей, если их нет в хранилище
  useEffect(() => {
    if (characters.length === 0) {
      dispatch(fetchCharacters({ page: 1, filters: {} }));
    }
  }, [dispatch, characters.length]);

  // Отфильтровываем персонажей, основываясь на списке residents у локации
  const episodeCharacters = useMemo(() => {
    if (!episode?.characters) return [];
    const residentIds = episode.characters.map((url) => url.split("/").pop());
    return characters.filter((character) => residentIds.includes(String(character.id)));
  }, [episode, characters]);

  // Обработка состояния загрузки и ошибок
  if (episodeStatus === "loading" || (charactersStatus === "loading" && episodeCharacters.length === 0)) {
    return <Spinner />;
  }

  if (episodeStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!episode) {
    return <div>No character data available</div>;
  }

  return (
    <div>
      <h1>{episode.name}</h1>
      <p>Type: {episode.episode}</p>
      <p>Dimension: {episode.air_date}</p>
      <div className="items">
        {episodeCharacters.length > 0 ? (
          episodeCharacters.map((card) => (
            <ItemCard key={card.id} itemId={card.id} itemType="character" showImage />
          ))
        ) : (
          <p>No characters found in this episode</p>
        )}
      </div>
    </div>
  );
}

export default EpisodeDetails;
