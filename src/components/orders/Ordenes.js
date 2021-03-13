import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Waiting from './Waiting';
import Preparing from './Preparing';
import Delivered from './Delivered';
import Title from '../title/Title';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Categoria(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Title title="Órdenes" />
      <Grid container alignItems="stretch" spacing={4}>
        <Grid container item xs={12} spacing={4}>
          <Waiting />
          <Preparing />
          <Delivered />
        </Grid>
      </Grid>
    </div>
  );
}
