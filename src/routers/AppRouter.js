import React from "react";
import {Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import RecipesDashboardPage from "../components/RecipesDashboard/RecipesDashboardPage/RecipesDashboardPage";
import EditRecipePage from "../components/Recipe/EditRecipePage/EditRecipePage";
import AddRecipePage from "../components/Recipe/AddRecipePage/AddRecipePage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Recipe from "../components/Recipe/Recipe";
import Loader from "react-promise-loader";
import {usePromiseTracker} from "react-promise-tracker";

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <Loader promiseTracker={usePromiseTracker}/>
        <Switch>
            <PublicRoute exact path="/login" component={LoginPage}/>
            <PublicRoute exact path="/" component={RecipesDashboardPage}/>
            <PrivateRoute exact path="/create" component={AddRecipePage}/>
            <PrivateRoute exact path="/edit/:id" component={EditRecipePage}/>
            <PublicRoute exact path="/recipe/:id" component={Recipe}/>
            <PublicRoute component={NotFoundPage}/>
        </Switch>
    </Router>
);

export default AppRouter;
