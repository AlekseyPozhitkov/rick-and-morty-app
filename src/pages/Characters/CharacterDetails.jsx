import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCharacterById } from "../../libs/redux/slices/characterDetailsSlice";
import { Spinner } from "../../components/Spinner/Spinner";

function CharacterDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { character, status, error } = useSelector((state) => state.characterDetails);
  const episodes = useSelector((state) => state.episodes.items);

  useEffect(() => {
    dispatch(fetchCharacterById(id));
  }, [dispatch, id]);

  // Отфильтровываем эпизоды, используя URL эпизодов у персонажа
  const characterEpisodes = useMemo(() => {
    if (!character?.episode) return [];
    const episodeIds = character.episode.map((url) => url.split("/").pop());
    return episodes.filter((episode) => episodeIds.includes(String(episode.id)));
  }, [character, episodes]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!character) {
    return <div>No character data available</div>;
  }

  return (
    <div>
      <img src={character.image} alt={character.name} />
      <h1>{character.name}</h1>
      <div>
        <h2>Informations</h2>
        <p>Gender: {character.gender}</p>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Origin: {character.origin.name}</p>
        <p>Location: {character.location.name}</p>
      </div>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        <h2>Episodes</h2>
        {characterEpisodes.map((episode) => (
          <div key={episode.id}>
            <p>
              {episode.name} (Episode: {episode.episode}, Date: {episode.air_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterDetails;
