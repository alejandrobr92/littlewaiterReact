import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { getOrders } from '../../firebase/orders';

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
const data = getOrders();
export default function FormRow(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllorders();
  }, []);

  const getAllorders = () => {
    setOrders(data);
  };
  const ViewOrders = () => {
    if (orders.length === 0) {
      return <h1>Loading.....</h1>;
    } else {
      return (
        <Grid item xs>
          {orders.map((item, i) => (
            <ul key={i}>
              <li>{'name:' + item.content[0].name}</li>
              <li>{'price: ' + item.content[0].price}</li>
              <li>{'quantity' + item.content[0].quantity}</li>
            </ul>
          ))}
        </Grid>
      );
    }
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item xs={12} md={4}>
        <Grid item xs className={classes.box}>
          <Box bgcolor="primary.main" textAlign="center" color="primary.contrastText" p={2}>
            En espera
          </Box>
        </Grid>
        <Paper className={classes.paper} elevation={8}>
          <Grid container spacing={2}>
            <ViewOrders />
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
}
