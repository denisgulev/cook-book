import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import selectRecipes from "../selectors/recipes";

const RecipesSummary = ({ recipesCount }) => {
  const recipeWord = recipesCount === 1 ? "recipe" : "recipes";

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{recipesCount}</span> {recipeWord}.
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Recipe
          </Link>
        </div>
      </div>
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
