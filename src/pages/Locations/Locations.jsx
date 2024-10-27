import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations, setLocationFilter } from '../../features/locations/locationsSlice';
import logo from "../../public/rick-and-morty-circle.svg"
import TripleSelect from '../../components/TripleSelect/TripleSelect'
import MyPaper from '../../components/Paper/MyPaper'
import MySelect from '../../components/Select/MySelect';
import MyInput from '../../components/Input/MyInput';
import styles from "./styles.module.css"
import MyButton from '../../components/Button/MyButton';
import Spinner from '../../components/Spinner/Spinner';

function Locations() {
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.locations.items);
    const status = useSelector((state) => state.locations.status);
    const filterOptions = useSelector((state) => state.locations.filterOptions);
    const filters = useSelector((state) => state.locations.filters);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchLocations({ page: currentPage, filters }));
        }
    }, [status, currentPage, filters, dispatch]);

    const onLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        dispatch(fetchLocations({ page: nextPage, filters }));
    };

    const handleFilterChange = (filterType, value) => {
        dispatch(setLocationFilter({ [filterType]: value }));
        dispatch(fetchLocations({ page: 1, filters: { ...filters, [filterType]: value } }));
        setCurrentPage(1); // Сброс страницы на 1 после фильтрации
    };

    return (
        <>
            <img className={styles.hero__img} src={logo} alt="rick-and-morty-circle" />
            <div className={styles.sorting}>
                <MyInput
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                    customStyles={{
                        box: { width: '30%' },
                    }}
                />
                <MySelect
                    label="Type"
                    options={filterOptions.type}
                    onChange={(value) => handleFilterChange('type', value)}
                    customStyles={{
                        box: { width: '20%' },
                    }}
                />
                <MySelect
                    label="Dimension"
                    options={filterOptions.dimension}
                    onChange={(value) => handleFilterChange('dimension', value)}
                    customStyles={{
                        box: { width: '20%' },
                    }}
                />
            </div>
            <div className={styles.locations}>
                {locations.map((location, index) => (
                    <MyPaper key={`${location.id}-${index}`} itemId={location.id} itemType="location" />
                ))}
                {status === 'failed' && <p>Ошибка загрузки данных.</p>}
            </div>
            {status === 'loading' && <Spinner />}
            <MyButton onClick={onLoadMore} />
        </>
    )
}

export default Locations