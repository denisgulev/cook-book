import React from "react";
import RecipeForm from "./RecipeForm";
import { connect } from "react-redux";
import { addRecipe } from "../actions/recipes";

const AddRecipePage = props => (
  <div>
    <h1>Add Recipe</h1>
    <RecipeForm
      onSubmit={recipe => {
        props.dispatch(addRecipe(recipe));
        props.history.push("/");
      }}
    />
  </div>
);

export default connect()(AddRecipePage);
