import React, { Fragment } from "react";
import RecipeList from "../RecipesList/RecipesList";
import RecipesSummary from "../RecipesSummary/RecipesSummary";

const RecipesDashboardPage = () => (
  <Fragment>
    <RecipesSummary />
    <RecipeList />
  </Fragment>
);

export default RecipesDashboardPage;
