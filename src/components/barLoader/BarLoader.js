import React, {useState} from 'react'
import { BarLoader as Loader } from 'react-spinners'
const Barloader =(props) =>{

    const {width, heigth, color, loading} = props

    return(
        <div className="Loader">
            <Loader width={width} height={heigth}  color={color} loading={loading}/>
        </div>
    )
}

export default Barloader;