import firebase from './firebase';

const signIn = (email, password) => {
  console.log('On signIn');
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      // ...
      console.log('Signed in!');
      setTimeout(() => console.log('waiting'), 2000);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};

export default signIn;
