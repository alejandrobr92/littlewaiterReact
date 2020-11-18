import React from 'react'
import {TextField} from '@material-ui/core'


export default function TextInput(props){
const {label, name, value, onChange}= props;
    return(
        <TextField
        variant="outline"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        /> 

    )
}