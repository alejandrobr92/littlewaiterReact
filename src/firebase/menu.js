import firebase from '../firebase';
//TODO Use real id
const idRest = 'SYUV0oVZZp2Ndqc3Fx7h';
export const getMenu = () => {
  const items = [];
  firebase
    .firestore()
    .collection('Restaurantes')
    .doc(idRest)
    .collection('menu')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        items.push(doc.data());
      });
      console.log(items);
    });
  return items;
};

export const addOrEditProduct = (product) => {
  //Todo
};

export const saveItemMenu = (newItem) => {
  firebase
    .firestore()
    .collection('Restaurantes')
    .doc(idRest)
    .collection('menu')
    .add(newItem)
    .then(console.log('Added new item'));
};
