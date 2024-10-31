import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCharacterById } from "../../libs/redux/slices/characterDetailsSlice";
import { Spinner } from "../../components/Spinner/Spinner";

function CharacterDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { character, status, error } = useSelector((state) => state.characterDetails);

  useEffect(() => {
    dispatch(fetchCharacterById(id));
  }, [dispatch, id]);

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
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
    </div>
  );
}

export default CharacterDetails;
