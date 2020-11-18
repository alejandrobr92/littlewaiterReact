import React, { Component } from 'react'
import Page from './page'
import { Paper, makeStyles } from '@material-ui/core';

const useStyles=makeStyles(theme=>({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3)
    }
})

)
export default function UserForm () {
    const classes=useStyles();
        return (
            <Paper className={classes.pageContent}>
            <Page/>
            </Paper>
        )
    
}

