import React from "react";
import { connect } from "react-redux";
import selectRecipes from "../selectors/recipes";

const RecipesSummary = ({ recipesCount }) => {
  const recipeWord = recipesCount === 1 ? "recipe" : "recipes";

  return (
    <div>
      <h1>
        Viewing {recipesCount} {recipeWord}.
      </h1>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleRecipes = selectRecipes(state.recipes, state.filters);

  return {
    recipesCount: visibleRecipes.length
  };
};

export default connect(mapStateToProps)(RecipesSummary);
