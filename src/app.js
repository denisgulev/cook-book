import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { startSetRecipes } from "../src/actions/recipes";
import { login, logout } from "./actions/auth";
import AppRouter, { history } from "./routers/AppRouter";
import LoadingPage from "./components/LoadingPage";
import configureStore from "./store/configureStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import { firebase } from "./firebase/firebase";
import "react-dates/lib/css/_datepicker.css";

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

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
  } else {
    store.dispatch(logout());
  }

  store.dispatch(startSetRecipes());
  history.push("/dashboard");
  renderApp();
});
