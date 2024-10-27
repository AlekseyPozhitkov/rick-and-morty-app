import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../features/characters/charactersSlice';
import MySelect from '../../components/Select/MySelect'
import MyInput from '../../components/Input/MyInput'
import MyCard from '../../components/Card/MyCard'
import styles from "./styles.module.css"
import logo from "../../public/RICKANDMORTY.svg"
import MyButton from '../../components/Button/MyButton';


function Characters() {
    const dispatch = useDispatch();
    const characters = useSelector((state) => state.characters.items);
    const status = useSelector((state) => state.characters.status);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Инициализируем загрузку персонажей
        if (status === 'idle') {
            dispatch(fetchCharacters(currentPage));
        }
    }, [status, currentPage, dispatch]);

    const onLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        dispatch(fetchCharacters(nextPage));
    };

    return (
        <>
            <img className={styles.hero__img} src={logo} alt="RICKANDMORTY" />
            <div className={styles.sorting}>
                <MyInput />
                <MySelect />
                <MySelect />
                <MySelect />
            </div>
            <div className={styles.cards}>
                {status === 'loading' && <p>Loading...</p>}
                {characters.map((card) => (
                    <MyCard key={card.id} characterId={card.id} />
                ))}
                {status === 'failed' && <p>Ошибка загрузки данных.</p>}
            </div>
            <MyButton onClick={onLoadMore} /> {/* Используем кнопку внутри Characters */}
        </>
    )
}

export default Characters