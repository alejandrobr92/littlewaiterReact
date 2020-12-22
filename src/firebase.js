import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAy43kKZ5dAOhgtRVKPaYuiGo_w4HApcK4",
  authDomain: "littlewaiter.firebaseapp.com",
  databaseURL: "https://littlewaiter.firebaseio.com",
  projectId: "littlewaiter",
  storageBucket: "littlewaiter.appspot.com",
  messagingSenderId: "88982717292",
  appId: "1:88982717292:web:c73f162a374142cdd4a949",
  measurementId: "G-TQEN1LFPD0",
  };

  // Initialize Firebase
firebase.initializeApp(config);
firebase.firestore().settings({ timestampInSnapshot: true})
export default firebase; 
// export const db= firebase.firestore();
// export const store= firebase.storage()
// export const auth =firebase.auth() 