import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import MySelect from '../../components/Select/MySelect'
import MyInput from '../../components/Input/MyInput'
import styles from "./styles.module.css"
import logo from "../../public/RICKANDMORTY.svg"

function Characters() {
    return (
        <>
            <Navbar />
            <img src={logo} alt="RICKANDMORTY" />
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