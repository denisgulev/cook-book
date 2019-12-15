import React from "react";
import RecipeForm from "./RecipeForm";
import { connect } from "react-redux";
import { startAddRecipe } from "../actions/recipes";

export class AddRecipePage extends React.Component {
  onSubmit = recipe => {
    this.props.startAddRecipe(recipe);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h1>Add Recipe</h1>
        <RecipeForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddRecipe: recipe => dispatch(startAddRecipe(recipe))
});

export default connect(undefined, mapDispatchToProps)(AddRecipePage);
