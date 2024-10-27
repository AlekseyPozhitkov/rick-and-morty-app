import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner'

const LoadingWrapper = ({ children }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Показываем спиннер при изменении маршрута
        setLoading(true);

        // Устанавливаем задержку в 1 секунду для скрытия спиннера
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer); // Очищаем таймер при размонтировании
    }, [location]);

    return (
        <>
            {loading && <Spinner />} {/* Показываем спиннер поверх всего контента */}
            {children} {/* Рендерим дочерние элементы */}
        </>
    );
};

export default LoadingWrapper;
