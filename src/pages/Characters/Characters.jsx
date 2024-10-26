import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import MySelect from '../../components/Select/MySelect'
import MyInput from '../../components/Input/MyInput'
import styles from "./styles.module.css"

function Characters() {
    return (
        <>
            <Navbar />
            <div className={styles.sorting}>
                <MyInput />
                <MySelect />
                <MySelect />
                <MySelect />
            </div>
        </>
    )
}

export default Characters