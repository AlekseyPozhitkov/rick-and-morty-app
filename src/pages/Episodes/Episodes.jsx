import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodes } from '../../features/episodes/episodesSlice';
import logo from "../../public/rick-and-morty-eyes.svg"
import AloneInput from '../../components/AloneInput/AloneInput'
import styles from "./styles.module.css"
import MyPaper from '../../components/Paper/MyPaper'
import MyButton from '../../components/Button/MyButton';

function Episodes() {
    const dispatch = useDispatch();
    const episodes = useSelector((state) => state.episodes.items);
    const status = useSelector((state) => state.episodes.status);
    const [currentPage, setCurrentPage] = useState(1); // Добавляем состояние для текущей страницы

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEpisodes(currentPage));
        }
    }, [status, currentPage, dispatch]);

    const onLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        dispatch(fetchEpisodes(nextPage)); // Загружаем следующую страницу
    };

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
            <MyButton onClick={onLoadMore} /> {/* Кнопка "Load More" для подгрузки страниц */}
        </div>
    );
}

export default Episodes