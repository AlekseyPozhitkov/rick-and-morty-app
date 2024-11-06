import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCharacterById } from "../../libs/redux/slices/characterDetailsSlice";
import { fetchCharacterEpisodes } from "../../libs/redux/slices/episodesSlice";
import { Spinner } from "../../components/Spinner";
import { ItemCard } from "../../components/ItemCard";

function CharacterDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Получаем данные о персонаже и статус загрузки
  const { character, status: characterStatus, error } = useSelector((state) => state.characterDetails);
  const { items: episodes, status: episodesStatus } = useSelector((state) => state.episodes);

  useEffect(() => {
    dispatch(fetchCharacterById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (character?.episode) {
      dispatch(fetchCharacterEpisodes(character.episode));
    }
  }, [dispatch, character]);

  // Обрабатываем состояние загрузки и ошибки
  if (characterStatus === "loading" || episodesStatus === "loading") {
    return <Spinner />;
  }

  if (characterStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!character) {
    return <div>No character data available</div>;
  }

  return (
    <div className="detailPage">
      <img className="image imageDetails" src={character.image} alt={character.name} />
      <h1 className="textDetails">{character.name}</h1>
      <div className="characterDetails">
        <div className="info">
          <h2 className="infoHeader">Informations</h2>
          <div className="characterInfo">
            <div>
              <p>Gender</p>
              <p>{character.gender}</p>
            </div>
            <div>
              <p>Status</p>
              <p>{character.status}</p>
            </div>
            <div>
              <p>Species</p>
              <p>{character.species}</p>
            </div>
            <div>
              <p>Origin</p>
              <p>{character.origin.name}</p>
            </div>
            <div>
              <p>Type</p>
              <p>{character.type || "Unknown"}</p>
            </div>
            <div>
              <p>Location</p>
              <p>{character.location.name}</p>
            </div>
          </div>
        </div>
        <div className="info">
          <h2 className="infoHeader">Episodes</h2>
          <div className="characterEpisodes">
            {episodes.length > 0 ? (
              episodes.map((episode) => (
                <ItemCard
                  key={episode.id}
                  itemId={episode.id}
                  itemType="episode"
                  sx={{
                    card: {
                      maxWidth: "413px",
                      height: "88px",
                      backgroundColor: "#FFFFFF",
                      boxShadow: "none",
                      borderBottom: "1px solid rgba(33, 33, 33, 0.08)",
                    },
                    cardContent: {
                      padding: "12px 16px",
                      justifyContent: "start",
                    },
                    typographyTop: {
                      fontSize: "14px",
                    },
                    typographyMiddle: {
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#6E798C",
                    },
                    typographyBottom: {
                      fontWeight: "500",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      color: "#8E8E93",
                      letterSpacing: "1.5px",
                    },
                  }}
                  reverse
                />
              ))
            ) : (
              <p>No episodes</p> // Сообщение, если у персонажа нет эпизодов
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
