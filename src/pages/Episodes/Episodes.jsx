import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodes, setFilter } from '../../features/episodes/episodesSlice';
import logo from "../../public/rick-and-morty-eyes.svg"
import AloneInput from '../../components/AloneInput/AloneInput'
import styles from "./styles.module.css"
import MyPaper from '../../components/Paper/MyPaper'
import MyButton from '../../components/Button/MyButton';
import Spinner from '../../components/Spinner/Spinner';
import MyInput from '../../components/Input/MyInput';

function Episodes() {
    const dispatch = useDispatch();
    const episodes = useSelector((state) => state.episodes.items);
    const status = useSelector((state) => state.episodes.status);
    const hasMore = useSelector((state) => state.episodes.hasMore); // Подключаем hasMore
    const nextPage = useSelector((state) => state.episodes.nextPage);
    const filters = useSelector((state) => state.episodes.filters);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEpisodes({ page: nextPage, filters }));
        }
    }, [status, nextPage, filters, dispatch]);

    const onLoadMore = () => {
        dispatch(fetchEpisodes({ page: nextPage, filters }));
    };

    const handleFilterChange = (value) => {
        dispatch(setFilter({ name: value }));
        dispatch(fetchEpisodes({ page: 1, filters: { ...filters, name: value } }));
    };

    return (
        <div>
            <img src={logo} alt="rick-and-morty-eyes" />
            <div className={styles.sorting}>
                <MyInput
                    onChange={(e) => handleFilterChange(e.target.value)}
                    placeholder="Filter by name or episode (ex. S01 or S01E02)"
                    customStyles={{
                        box: { width: '50%', margin: '0 auto 20px' },
                    }}
                />
            </div>
            <div className={styles.episodes}>
                {episodes.map((episode, index) => (
                    <MyPaper
                        key={`${episode.id}-${index}`}
                        itemId={episode.id}
                        itemType="episode"
                    />
                ))}
                {status === 'failed' && <p>Ошибка загрузки данных.</p>}
            </div>
            {status === 'loading' && <Spinner />}
            {hasMore && status !== 'loading' && <MyButton onClick={onLoadMore} />} {/* Кнопка отображается условно */}
        </div>
    );
}

export default Episodes