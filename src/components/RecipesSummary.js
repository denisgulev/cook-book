import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import selectRecipes from "../selectors/recipes";

const RecipesSummary = ({ visibleRecipesCount, totalRecipesCount }) => {
  const recipeWord = visibleRecipesCount === 1 ? "recipe" : "recipes";

  return (
    <div className="page-header">
      <div className="content-container page-header__content">
        <div className="page-header__info">
          <h1 className="page-header__title">
            Viewing <span>{visibleRecipesCount}</span> {recipeWord}.
          </h1>
          <h4 className="page-header__subtitle">
            Total number of {recipeWord}: <span>{totalRecipesCount}</span>
          </h4>
        </div>
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
    visibleRecipesCount: visibleRecipes.length,
    totalRecipesCount: state.recipes.length
  };
};

export default connect(mapStateToProps)(RecipesSummary);
