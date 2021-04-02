import firebase from './firebase';

export const signIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('Signed in');
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};

export const logOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('sign-out successful');
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onAuthUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
    //user is signed in
  });
};
