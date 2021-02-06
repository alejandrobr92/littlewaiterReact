import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RenderAccordion from './RenderAccordion';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  box: {
    marginBottom: theme.spacing(4),
  },
  botton: {
    marginTop: theme.spacing(5),
  },
}));
const Delivered = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item xs={12} md={4}>
        <Grid item xs className={classes.box}>
          <Box bgcolor="primary.main" textAlign="center" color="primary.contrastText" p={2}>
            Entregados
          </Box>
        </Grid>
        <Paper className={classes.paper} elevation={8}>
          <Grid container spacing={2}>
            <Grid item xs>
              <RenderAccordion
                summary="Mesa 2 $5000.00"
                details={[
                  { 'Name :': 'Dan' },
                  { 'part :': 'Dani' },
                  { 'price :': 'Dani' },
                  { 'quantity :': 'Dani' },
                ]}
              />
              <RenderAccordion
                summary="Mesa 3 $32000.00"
                details={[
                  { 'Name :': 'Dan' },
                  { 'part :': 'Dani' },
                  { 'price :': 'Dani' },
                  { 'quantity :': 'Dani' },
                ]}
              />
              <RenderAccordion
                summary="Mesa 4 $98000.00"
                details={[
                  { 'Name :': 'Dan' },
                  { 'part :': 'Dani' },
                  { 'price :': 'Dani' },
                  { 'quantity :': 'Dani' },
                ]}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" className={classes.botton}>
            <Button variant="contained" color="primary">
              Aceptar
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default Delivered;
