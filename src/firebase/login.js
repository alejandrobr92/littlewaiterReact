import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from './firebase';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [loading, setLoading] = useState(true);

  const signIn = async (email, password) => {
    let userValue = null;
    userValue = firebase.auth().signInWithEmailAndPassword(email, password);
    try {
      const userCredential = await userValue;
      const user = userCredential.user;
      return user;
    } catch (error) {
      setNotify({
        isOpen: true,
        message: 'usuario y/o contraseña incorrecto',
        type: 'error',
      });
      console.log('error message:=>', error.message);
      console.log('error message:=>', error.code);
    }
  };

  const logOut = () => {
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

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    notify,
    setNotify,
    signIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};
