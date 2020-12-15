import firebase from './config';
//TODO Use real id
const idRest = "SYUV0oVZZp2Ndqc3Fx7h"
export const getCategories = () =>{
  const items = [];
  firebase
    .firestore()
    .collection("Restaurantes")
    .doc(idRest)
    .collection("categories")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        items.push(doc.data());
      });
      console.log(items);
    });
  return items;
};
