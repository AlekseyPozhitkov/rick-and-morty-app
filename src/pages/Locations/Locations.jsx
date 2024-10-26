import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../features/locations/locationsSlice';
import logo from "../../public/rick-and-morty-circle.svg"
import TripleSelect from '../../components/TripleSelect/TripleSelect'
import MyPaper from '../../components/Paper/MyPaper'
import styles from "./styles.module.css"

function Locations() {
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.locations.items);
    const status = useSelector((state) => state.locations.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchLocations());
        }
    }, [status, dispatch]);


    return (
        <>
            <img className={styles.hero__img} src={logo} alt="rick-and-morty-circle" />
            <TripleSelect />
            <div className={styles.locations}>
                {status === 'loading' && <p>Loading...</p>}
                {status === 'succeeded' &&
                    locations.map((location) =>
                        <MyPaper
                            key={location.id}
                            itemId={location.id}
                            itemType="location"
                        />
                    )
                }
                {status === 'failed' && <p>Ошибка загрузки данных.</p>}
            </div>
        </>
    )
}

export default Locations