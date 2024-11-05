import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEpisodeById } from "../../libs/redux/slices/episodeDetailsSlice";
import { Spinner } from "../../components/Spinner/Spinner";
import { fetchEpisodeCharacters } from "../../libs/redux/slices/charactersSlice";
import { ItemCard } from "../../components/ItemCard/ItemCard";

function EpisodeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { episode, status: episodeStatus, error } = useSelector((state) => state.episodeDetails);
  const { items: characters, status: charactersStatus } = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(fetchEpisodeById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (episode?.characters) {
      dispatch(fetchEpisodeCharacters(episode.characters));
    }
  }, [dispatch, episode]);

  if (episodeStatus === "loading" || charactersStatus === "loading") {
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
        {characters.length > 0 ? (
          characters.map((character) => (
            <ItemCard key={character.id} itemId={character.id} itemType="character" showImage />
          ))
        ) : (
          <p>No characters found in this episode</p>
        )}
      </div>
    </div>
  );
}

export default EpisodeDetails;
