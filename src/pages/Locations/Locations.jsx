import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../features/locations/locationsSlice';
import logo from "../../public/rick-and-morty-circle.svg"
import TripleSelect from '../../components/TripleSelect/TripleSelect'
import MyPaper from '../../components/Paper/MyPaper'
import styles from "./styles.module.css"
import MyButton from '../../components/Button/MyButton';

function Locations() {
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.locations.items);
    const status = useSelector((state) => state.locations.status);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchLocations(currentPage));
        }
    }, [status, currentPage, dispatch]);

    const onLoadMore = () => {
        const currentScrollY = window.scrollY;

        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        dispatch(fetchLocations(nextPage)).then(() => {
            window.scrollTo(0, currentScrollY);
        });
    }

    return (
        <>
            <img className={styles.hero__img} src={logo} alt="rick-and-morty-circle" />
            <TripleSelect />
            <div className={styles.locations}>
                {status === 'loading' && <p>Loading...</p>}
                {status === 'succeeded' &&
                    locations.map((location) => (
                        <MyPaper
                            key={location.id}
                            itemId={location.id}
                            itemType="location"
                        />
                    ))
                }
                {status === 'failed' && <p>Ошибка загрузки данных.</p>}
            </div>
            <MyButton onClick={onLoadMore} /> {/* Кнопка загрузки следующей страницы */}
        </>
    )
}

export default Locations