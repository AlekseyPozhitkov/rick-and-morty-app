import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEpisodeById } from "../../libs/redux/slices/episodeDetailsSlice";
import { Spinner } from "../../components/Spinner/Spinner";

function EpisodeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { episode, status, error } = useSelector((state) => state.episodeDetails);

  useEffect(() => {
    dispatch(fetchEpisodeById(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
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
    </div>
  );
}

export default EpisodeDetails;
