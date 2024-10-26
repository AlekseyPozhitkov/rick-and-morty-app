import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../features/characters/charactersSlice';
import MySelect from '../../components/Select/MySelect'
import MyInput from '../../components/Input/MyInput'
import styles from "./styles.module.css"
import logo from "../../public/RICKANDMORTY.svg"
import MyCard from '../../components/Card/MyCard'


function Characters() {
    const dispatch = useDispatch();
    const characters = useSelector((state) => state.characters.items);
    const status = useSelector((state) => state.characters.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCharacters());
        }
    }, [status, dispatch]);

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
                {status === 'succeeded' && characters.map((card) =>
                    <MyCard
                        key={card.id}
                        characterId={card.id}
                    />
                )}
                {status === 'failed' && <p>Ошибка загрузки данных.</p>}
            </div>
        </>
    )
}

export default Characters