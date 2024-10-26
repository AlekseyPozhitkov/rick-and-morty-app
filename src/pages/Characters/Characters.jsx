import React, { useEffect, useState } from 'react'
import MySelect from '../../components/Select/MySelect'
import MyInput from '../../components/Input/MyInput'
import styles from "./styles.module.css"
import logo from "../../public/RICKANDMORTY.svg"
import axios from 'axios'
import MyCard from '../../components/Card/MyCard'

const baseUrl = "https://rickandmortyapi.com/api/character"

function Characters() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        axios.get(baseUrl)
            .then(res => {
                setCards(res.data.results);
                // console.log(res);

            })
    }, [])

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
                {cards.map((card) =>
                    <MyCard
                        name={card.name}
                        species={card.species}
                        gender={card.gender}
                        key={card.id}
                        status={card.status}
                        photo={card.image}
                        url={card.url}
                        origin={card.origin}
                        location={card.location}
                        episode={card.episode}
                    />
                )}
            </div>
        </>
    )
}

export default Characters