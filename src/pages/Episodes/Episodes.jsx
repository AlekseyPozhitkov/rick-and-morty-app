import React, { useEffect, useState } from 'react'
import logo from "../../public/rick-and-morty-eyes.svg"
import AloneInput from '../../components/AloneInput/AloneInput'
import axios from 'axios'
import styles from "./styles.module.css"
import MyPaper from '../../components/Paper/MyPaper'

const baseUrl = "https://rickandmortyapi.com/api/episode"


function Episodes() {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        axios.get(baseUrl)
            .then(res => {
                setEpisodes(res.data.results);
                console.log(res);
            })
    }, [])


    return (
        <div>
            <img src={logo} alt="rick-and-morty-" />
            <AloneInput />
            <div className={styles.locations}>
                {episodes.map((episode) =>
                    <MyPaper
                        episode={episode.episode}
                        key={episode.id}
                        name={episode.name}
                        type={episode.type}
                        url={episode.url}
                        characters={episode.characters}
                        date={episode.air_date}
                    />
                )}
            </div>
        </div>
    )
}

export default Episodes