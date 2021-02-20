import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import firebase from '../../firebase/firebase';
import * as firestore from '../../firebase/orders';

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

export default function FormRow(props) {
  const [orders, setOrders] = useState([]);
  const idRest = 'SYUV0oVZZp2Ndqc3Fx7h';

  const getAllOrders = () => {
    const listener = firebase
      .firestore()
      .collection('Restaurantes')
      .doc(idRest)
      .collection('orders')
      .onSnapshot((snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          if (doc.data().content.length && doc.data().content[0].state === 'waiting') {
            //console.log(doc.id);
            const d = doc.data();
            d.id = doc.id;
            console.log(d.id);
            items.push(d);
          }
        });
        setOrders(items);
      });
    return listener;
  };

  const moveToPreparing = (order) => {
    order.content.forEach((part) => {
      part.state = 'preparing';
    });
    firestore.moveToNextStep(order);
  };

  useEffect(async () => {
    await getAllOrders();
    return () => {
      console.log('Listener detached');
    };
  }, []);

  const ViewOrders = () => {
    if (orders.length === 0) {
      return <h1>Loading.....</h1>;
    } else {
      return (
        <Grid item xs>
          {orders.map((order, i) => (
            <Card key={order.id}>
              <ul>
                <li>{'name:' + order.content[0].name}</li>
                <li>{'price: ' + order.content[0].price}</li>
                <li>{'quantity' + order.content[0].quantity}</li>
              </ul>
              <Button onClick={() => moveToPreparing(order)} variant="contained" color="primary">
                Aceptar
              </Button>
            </Card>
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
          <Box bgcolor="#c79100" textAlign="center" color="primary.contrastText" p={2}>
            En espera
          </Box>
        </Grid>
        <Paper className={classes.paper} elevation={8}>
          <Grid container spacing={2}>
            <ViewOrders />
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
