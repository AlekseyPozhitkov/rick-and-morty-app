import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodes } from '../../features/episodes/episodesSlice';
import logo from "../../public/rick-and-morty-eyes.svg"
import AloneInput from '../../components/AloneInput/AloneInput'
import styles from "./styles.module.css"
import MyPaper from '../../components/Paper/MyPaper'

function Episodes() {
    const dispatch = useDispatch();
    const episodes = useSelector((state) => state.episodes.items);
    const status = useSelector((state) => state.episodes.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEpisodes());
        }
    }, [status, dispatch]);

    return (
        <div>
            <img src={logo} alt="rick-and-morty-" />
            <AloneInput />
            <div className={styles.locations}>
                {status === 'loading' && <p>Loading...</p>}
                {status === 'succeeded' &&
                    episodes.map((episode) =>
                        <MyPaper
                            key={episode.id}
                            itemId={episode.id}
                            itemType="episode"
                        />
                    )
                }
                {status === 'failed' && <p>Ошибка загрузки данных.</p>}
            </div>
        </div>
    )
}

export default Episodes