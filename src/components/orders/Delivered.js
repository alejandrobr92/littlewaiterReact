import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import RenderAccordion from './RenderAccordion';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import firebase from '../../firebase/firebase';
import * as firestore from '../../firebase/orders';
import Card from '@material-ui/core/Card';

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
          if (doc.data().content.length && doc.data().content[0].state === 'delivered') {
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

  const moveToStats = (order) => {
    order.content.forEach((part) => {
      part.state = 'paid';
    });
    firestore.moveToNextStep(order);
  };

  useEffect(async () => {
    await getAllOrders();
    return () => {
      console.log('Listener detached');
    };
  }, []);

  return (
    <React.Fragment>
      <Grid item xs={12} md={4}>
        <Grid item xs className={classes.box}>
          <Box bgcolor="#c79100" textAlign="center" color="primary.contrastText" p={2}>
            Entregados
          </Box>
        </Grid>
        <Paper className={classes.paper} elevation={8}>
          <Grid container spacing={2}>
            <Grid item xs>
              {orders.map((order) => (
                <Card key={order.id}>
                  <Accordion>
                    <AccordionSummary>
                      <label>{`Mesa: ${order.table} Total: $${order.total}`}</label>
                    </AccordionSummary>
                    <AccordionDetails
                      summary={`Mesa: ${order.table} Total: $${order.total}`}
                      details={[
                        { 'Name :': order.name },
                        { 'Precio :': order.price },
                        { 'Cantidad :': order.quantity },
                      ]}
                    ></AccordionDetails>
                  </Accordion>
                  <Button onClick={() => moveToStats(order)} variant="contained" color="primary">
                    Aceptar
                  </Button>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default Delivered;
