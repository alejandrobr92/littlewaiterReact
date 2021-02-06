import React from 'react';
import Page from './page';
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));
export default function FormMenu(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.pageContent}>
      <Page {...props} />
    </Paper>
  );
}
