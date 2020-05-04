import React from "react";
import { connect } from "react-redux";
import RecipeListItem from "./RecipesListItem/RecipesListItem";
import getVisibleRecipes from "../../../selectors/recipes";

export const RecipesList = props => {

	let recipesList = <p>Nessuna ricetta</p>
	if (props.recipes.length !== 0) {
		recipesList = (
			props.recipes.map(recipe => {
				return <RecipeListItem key={recipe.id} {...recipe} />;
			})
		);
	}

	return (
		<div className="content-container">
			<div className="list-body">
				{
					recipesList
				}
			</div>
		</div>
	);
};

const mapStateToProps = state => {
  // specify what info from the store we want
  // our component to be able to access
  return {
    recipes: getVisibleRecipes(state.recipes, state.filters)
  };
};

export default connect(mapStateToProps)(RecipesList);
