import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, setFilter } from '../../features/characters/charactersSlice';
import MySelect from '../../components/Select/MySelect'
import MyInput from '../../components/Input/MyInput'
import MyCard from '../../components/Card/MyCard'
import MyButton from '../../components/Button/MyButton';
import Spinner from '../../components/Spinner/Spinner';
import styles from "./styles.module.css"
import logo from "../../public/RICKANDMORTY.svg"


function Characters() {
    const dispatch = useDispatch();
    const characters = useSelector((state) => state.characters.items);
    const status = useSelector((state) => state.characters.status);
    const nextPage = useSelector((state) => state.characters.nextPage);
    const filter = useSelector((state) => state.characters.filter);

    // Инициализируем загрузку персонажей
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCharacters({ page: nextPage, filter }));
        }
    }, [status, nextPage, filter, dispatch]);

    const onLoadMore = () => {
        dispatch(fetchCharacters({ page: nextPage, filter }));
    };

    const handleFilterChange = (e) => {
        const newFilter = e.target.value;
        dispatch(setFilter(newFilter));
        dispatch(fetchCharacters({ page: 1, filter: newFilter }));
    };

    return (
        <>
            <img className={styles.hero__img} src={logo} alt="RICKANDMORTY" />
            <div className={styles.sorting}>
                <MyInput onChange={handleFilterChange} />
                <MySelect />
                <MySelect />
                <MySelect />
            </div>
            <div className={styles.cards}>
                {status === 'loading' && <Spinner />}
                {characters.map((card) => (
                    <MyCard key={card.id} characterId={card.id} />
                ))}
                {status === 'failed' && <p>Ошибка загрузки данных.</p>}
            </div>
            <MyButton onClick={onLoadMore} />
        </>
    )
}

export default Characters