import firebase from '../firebase';

const idRest = 'SYUV0oVZZp2Ndqc3Fx7h';
export const getOrders = () => {
  const items = [];

  firebase
    .firestore()
    .collection('Restaurantes')
    .doc(idRest)
    .collection('orders')
    .onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        items.push(change.doc.data());
      });
    });

  return items;
};
