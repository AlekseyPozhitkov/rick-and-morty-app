import React from "react";
import styles from "./styles.module.css";
import spiral from "../../public/spiral.svg"; // Подключаем загруженную картинку

export const Spinner = () => {
  return (
    <div className={styles.spinnerOverlay}>
      <img src={spiral} className={styles.spinner} alt="Loading..." />
    </div>
  );
};
