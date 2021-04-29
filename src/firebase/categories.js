import firebase from './firebase';

//TODO Use real id
const idRest = 'SYUV0oVZZp2Ndqc3Fx7h';
export const getCategories = async () => {
  const items = [];
  const values = firebase
    .firestore()
    .collection('Restaurantes')
    .doc(idRest)
    .collection('categories')
    .get();
  try {
    const snapshot = await values;
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      items.push(change.doc.data());
    });
    return items;
  } catch (error) {
    console.log('error', error);
  }
};
export const removeCategorie = async (id) => {
  let response = false;
  const item = firebase
    .firestore()
    .collection('Restaurantes')
    .doc(idRest)
    .collection('categories')
    .doc(id);
  try {
    await item.delete();
    response = true;
    console.log('Document successfully deleted!');
    return response;
  } catch (error) {
    console.error('Error removing document: ', error);
  }
};
export const addOrEditCategorie = (categoria) => {
  if (categoria.id === '') {
    const item = firebase
      .firestore()
      .collection('Restaurantes')
      .doc(idRest)
      .collection('categories')
      .doc();
    return item
      .set({ ...categoria, id: item.id })
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
      .collection('categories')
      .doc(categoria.id);
    return item
      .update(categoria)
      .then(function () {
        console.log('Document successfully updated!');
      })
      .catch(function (error) {
        console.log('Error updating document: ', error);
      });
  }
};
