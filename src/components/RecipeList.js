import React from "react";
import { connect } from "react-redux";
import RecipeListItem from "./RecipeListItem";
import getVisibleRecipes from "../selectors/recipes";

export const RecipeList = props => (
  <div>
    {props.recipes.length === 0 ? (
      <p>No Recipes</p>
    ) : (
      props.recipes.map(recipe => {
        return <RecipeListItem key={recipe.id} {...recipe} />;
      })
    )}
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
