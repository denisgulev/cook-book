import React from "react";
import RecipeList from "./RecipeList";
import RecipeListFilters from "./RecipeListFilters";

const RecipeDashboardPage = () => (
  <div>
    <RecipeListFilters />
    <RecipeList />
  </div>
);

export default RecipeDashboardPage;
