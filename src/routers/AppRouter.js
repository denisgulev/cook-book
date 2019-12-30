import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import RecipeDashboardPage from "../components/RecipeDashboardPage";
import EditRecipePage from "../components/EditRecipePage";
import AddRecipePage from "../components/AddRecipePage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" exact={true} component={LoginPage} />
        <PrivateRoute path="/dashboard" component={RecipeDashboardPage} />
        <PrivateRoute path="/create" component={AddRecipePage} />
        <PrivateRoute path="/edit/:id" component={EditRecipePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
