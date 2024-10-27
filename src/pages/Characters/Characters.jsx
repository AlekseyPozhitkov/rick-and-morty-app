import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, setFilter, fetchFilterOptions } from '../../features/characters/charactersSlice';
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
    const hasMore = useSelector((state) => state.characters.hasMore);
    const filters = useSelector((state) => state.characters.filters);
    const filterOptions = useSelector((state) => state.characters.filterOptions);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCharacters({ page: currentPage, filters }));
        }
    }, [status, currentPage, filters, dispatch]);

    const onLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        dispatch(fetchCharacters({ page: nextPage, filters }));
    };

    const handleFilterChange = (filterType, value) => {
        dispatch(setFilter({ [filterType]: value }));
        dispatch(fetchCharacters({ page: 1, filters: { ...filters, [filterType]: value } }));
        setCurrentPage(1);
    };

    return (
        <>
            <img className={styles.hero__img} src={logo} alt="RICKANDMORTY" />
            <div className={styles.sorting}>
                <MyInput onChange={(e) => handleFilterChange('name', e.target.value)} />
                <MySelect label="Species" options={filterOptions.species} onChange={(value) => handleFilterChange('species', value)} />
                <MySelect label="Gender" options={filterOptions.gender} onChange={(value) => handleFilterChange('gender', value)} />
                <MySelect label="Status" options={filterOptions.status} onChange={(value) => handleFilterChange('status', value)} />
            </div>
            <div className={styles.cards}>
                {characters.map((card, index) => (
                    <MyCard key={`${card.id}-${index}`} characterId={card.id} />
                ))}
            </div>
            {status === 'loading' && <Spinner />}
            {hasMore && status !== 'loading' && <MyButton onClick={onLoadMore} />}
        </>
    )
}

export default Characters