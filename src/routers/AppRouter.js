import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RecipeDashboardPage from "../components/RecipeDashboardPage";
import EditRecipePage from "../components/EditRecipePage";
import AddRecipePage from "../components/AddRecipePage";
import HelpPage from "../components/HelpPage";
import Header from "../components/Header";
import NotFoundPage from "../components/NotFoundPage";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={RecipeDashboardPage} />
        <Route path="/create" component={AddRecipePage} />
        <Route path="/help" component={HelpPage} />
        <Route path="/edit/:id" component={EditRecipePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
