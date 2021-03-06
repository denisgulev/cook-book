import React from "react";
import RecipeList from "../RecipesList/RecipesList";
import RecipesSummary from "../RecipesSummary/RecipesSummary";

const RecipesDashboardPage = () => (
    <>
        <RecipesSummary/>
        <RecipeList/>
    </>
);

export default RecipesDashboardPage;
