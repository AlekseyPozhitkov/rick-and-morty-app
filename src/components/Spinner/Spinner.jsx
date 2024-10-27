import React from 'react';
import styles from './styles.module.css';
import spiral from '../../public/spiral.svg'; // Подключаем загруженную картинку

function Spinner() {
    return (
        <div className={styles.spinnerOverlay}>
            <img src={spiral} className={styles.spinner} alt="Loading..." />
        </div>
    );
}

export default Spinner;
