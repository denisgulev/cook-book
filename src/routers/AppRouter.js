import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import RecipeDashboardPage from "../components/RecipeDashboardPage";
import EditRecipePage from "../components/EditRecipePage";
import AddRecipePage from "../components/AddRecipePage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Recipe from "../components/Recipe";
import Loader from "react-promise-loader";
import { usePromiseTracker } from "react-promise-tracker";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
		<Loader promiseTracker={usePromiseTracker} />
		<Switch>
			<PublicRoute exact path="/login" component={LoginPage} />
			<PublicRoute exact path="/" component={RecipeDashboardPage} />
			<PrivateRoute exact path="/create" component={AddRecipePage} />
			<PrivateRoute exact path="/edit/:id" component={EditRecipePage} />
			<PublicRoute exact path="/recipe/:id" component={Recipe} />
			<PublicRoute component={NotFoundPage} />
		</Switch>
  </Router>
);

export default AppRouter;
