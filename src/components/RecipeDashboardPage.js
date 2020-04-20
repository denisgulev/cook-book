import React, { Fragment } from "react";
import RecipeList from "./RecipeList";
import RecipeListFilters from "./RecipeListFilters";
import RecipesSummary from "./RecipesSummary";

const RecipeDashboardPage = () => (
  <Fragment>
    <RecipesSummary />
    <RecipeList />
  </Fragment>
);

export default RecipeDashboardPage;
