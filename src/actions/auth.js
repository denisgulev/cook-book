import { firebase } from '../firebase/firebase';

export const login = uid => ({
  type: 'LOGIN',
  uid
});

export const startLogin = (email, password) => {
  return () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        switch (errorCode) {
          case 'auth/user-not-found':
            alert('Email non riconosciuta.');
            break;
          case 'auth/wrong-password':
            alert('Password non valida.');
            break;
          case 'auth/invalid-email':
            alert('Inserire una email valida.');
            break;
          default:
            break;
        }
      });
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
