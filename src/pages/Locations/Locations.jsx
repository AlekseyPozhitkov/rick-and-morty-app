import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../features/locations/locationsSlice';
import logo from "../../public/rick-and-morty-circle.svg"
import TripleSelect from '../../components/TripleSelect/TripleSelect'
import MyPaper from '../../components/Paper/MyPaper'
import styles from "./styles.module.css"
import MyButton from '../../components/Button/MyButton';
import Spinner from '../../components/Spinner/Spinner';

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
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        dispatch(fetchLocations(nextPage));
    };

    return (
        <>
            <img className={styles.hero__img} src={logo} alt="rick-and-morty-circle" />
            <TripleSelect />
            <div className={styles.locations}>
                {/* Всегда рендерим карточки, даже если статус 'loading' */}
                {locations.map((location) => (
                    <MyPaper
                        key={location.id}
                        itemId={location.id}
                        itemType="location"
                    />
                ))}
                {/* Показываем сообщение об ошибке только если статус 'failed' */}
                {status === 'failed' && <p>Ошибка загрузки данных.</p>}
            </div>
            {/* Спиннер поверх карточек */}
            {status === 'loading' && <Spinner />}
            <MyButton onClick={onLoadMore} />
        </>
    )
}

export default Locations