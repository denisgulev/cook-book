import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { startSetRecipes } from "../src/actions/recipes";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "./firebase/firebase";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

// All of the components can use the store.
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));

store.dispatch(startSetRecipes()).then(() => {
  ReactDOM.render(jsx, document.getElementById("app"));
});
