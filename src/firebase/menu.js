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
  console.log(product);
  if (product.id === '') {
    const item = firebase
      .firestore()
      .collection('Restaurantes')
      .doc(idRest)
      .collection('menu')
      .doc();
    return item
      .set({ ...product, id: item.id })
      .then(function (docRef) {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.log('error document', error);
      });
  } else {
    const item = firebase
      .firestore()
      .collection('Restaurantes')
      .doc(idRest)
      .collection('menu')
      .doc(product.id);
    return item
      .update(product)
      .then(function () {
        console.log('Document successfully updated!');
      })
      .catch(function (error) {
        console.log('Error updating document: ', error);
      });
  }
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
