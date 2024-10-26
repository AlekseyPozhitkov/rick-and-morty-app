import React, { useEffect, useState } from 'react'
import logo from "../../public/rick-and-morty-circle.svg"
import TripleSelect from '../../components/TripleSelect/TripleSelect'
import axios from 'axios'
import MyPaper from '../../components/Paper/MyPaper'
import styles from "./styles.module.css"

const baseUrl = "https://rickandmortyapi.com/api/location"

function Locations() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        axios.get(baseUrl)
            .then(res => {
                setLocations(res.data.results);
                // console.log(res);
            })
    }, [])

    return (
        <>
            <img src={logo} alt="rick-and-morty-circle" />
            <TripleSelect />
            <div className={styles.locations}>
                {locations.map((location) =>
                    <MyPaper
                        key={location.id}
                        name={location.name}
                        type={location.type}
                        url={location.url}
                        residents={location.residents}
                        dimension={location.dimension}
                        created={location.created}
                    />
                )}
            </div>
        </>
    )
}

export default Locations