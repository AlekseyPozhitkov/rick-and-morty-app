import React from 'react'
import logo from "../../public/rick-and-morty-circle.svg"
import TripleSelect from '../../components/TripleSelect/TripleSelect'

function Locations() {
    return (
        <>
            <img src={logo} alt="rick-and-morty-circle" />
            <TripleSelect />
        </>
    )
}

export default Locations