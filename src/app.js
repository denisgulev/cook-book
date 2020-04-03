import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { startSetRecipes } from "../src/actions/recipes";
import { login, logout } from "./actions/auth";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import { firebase } from "./firebase/firebase";

const store = configureStore();

// All of the components can use the store.
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(jsx, document.getElementById("app"));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
  } else {
    store.dispatch(logout());
  }
  renderApp();
  store.dispatch(startSetRecipes());
});
