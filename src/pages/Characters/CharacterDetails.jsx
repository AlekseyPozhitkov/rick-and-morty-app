import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCharacterById } from "../../libs/redux/slices/characterDetailsSlice";
import { fetchEpisodes } from "../../libs/redux/slices/episodesSlice";
import { Spinner } from "../../components/Spinner/Spinner";
import { ItemCard } from "../../components/ItemCard/ItemCard";

function CharacterDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Получаем нужные данные из хранилища
  const { character, status: characterStatus, error } = useSelector((state) => state.characterDetails);
  const { items: episodes, status: episodesStatus } = useSelector((state) => state.episodes);

  useEffect(() => {
    dispatch(fetchCharacterById(id));
  }, [dispatch, id]);

  // Загружаем эпизоды, если они еще не загружены
  useEffect(() => {
    if (episodes.length === 0) {
      dispatch(fetchEpisodes({ page: 1, filters: {} }));
    }
  }, [dispatch, episodes.length]);

  // Отфильтровываем эпизоды, используя URL эпизодов у персонажа
  const characterEpisodes = useMemo(() => {
    if (!character?.episode) return [];
    const episodeIds = character.episode.map((url) => url.split("/").pop());
    return episodes.filter((episode) => episodeIds.includes(String(episode.id)));
  }, [character, episodes]);

  // Обрабатываем состояние загрузки и ошибки
  if (characterStatus === "loading" || (episodesStatus === "loading" && characterEpisodes.length === 0)) {
    return <Spinner />;
  }

  if (characterStatus === "failed") {
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
        {characterEpisodes.length > 0 ? (
          characterEpisodes.map((episode) => (
            <ItemCard
              key={episode.id}
              itemId={episode.id}
              itemType="episode"
              showImage={false} // Отключаем изображение, если оно не нужно
              customStyles={{
                cardContent: {
                  height: "130px",
                  justifyContent: "center",
                  backgroundColor: "#FAFAFA",
                },
              }}
            />
          ))
        ) : (
          <p>No episodes</p> // Сообщение, если у персонажа нет эпизодов
        )}
      </div>
    </div>
  );
}

export default CharacterDetails;
