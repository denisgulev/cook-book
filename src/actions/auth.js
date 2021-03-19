import {firebase} from "../firebase/firebase";
import * as actions from "./actionTypes";

export const login = uid => ({
    type: actions.LOGIN,
    uid
});

export const startLogin = (email, password) => {
    return () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                // Existing and future Auth states are now persisted in the current session only.
                firebase.auth()
                    .signInWithEmailAndPassword(email, password)
                    .catch(function (error) {
                        // Handle Errors here.
                        let errorCode = error.code;
                        switch (errorCode) {
                            case "auth/user-not-found":
                                alert("Email non riconosciuta.");
                                break;
                            case "auth/wrong-password":
                                alert("Password non valida.");
                                break;
                            case "auth/invalid-email":
                                alert("Inserire una email valida.");
                                break;
                            default:
                                break;
                        }
                    });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('errorCode - ', errorCode)
                console.log('errorMessage - ', errorMessage)
            })
    };
};

export const logout = () => ({
    type: actions.LOGOUT
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};
