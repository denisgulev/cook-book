import React from "react";
import { connect } from "react-redux";
import RecipeListItem from "./RecipeListItem";
import getVisibleRecipes from "../selectors/recipes";

export const RecipeList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-desktop">Recipe</div>
      <div className="show-for-mobile">Recipes</div>
    </div>
    <div className="list-body">
      {props.recipes.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No recipes</span>
        </div>
      ) : (
        props.recipes.map(recipe => {
          return <RecipeListItem key={recipe.id} {...recipe} />;
        })
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  // specify what info from the store we want
  // our component to be able to access
  return {
    recipes: getVisibleRecipes(state.recipes, state.filters)
  };
};

export default connect(mapStateToProps)(RecipeList);
