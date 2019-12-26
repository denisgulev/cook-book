import React from "react";
import { connect } from "react-redux";
import RecipeForm from "./RecipeForm";
import { editRecipe, removeRecipe } from "../actions/recipes";

export class EditRecipePage extends React.Component {
  onSubmit = recipe => {
    this.props.editRecipe(this.props.recipe.id, recipe);
    this.props.history.push("/");
  };

  onRemove = () => {
    this.props.removeRecipe({ id: this.props.recipe.id });
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <RecipeForm recipe={this.props.recipe} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  recipe: state.recipes.find(recipe => recipe.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  removeRecipe: data => dispatch(removeRecipe(data)),
  editRecipe: (id, recipe) => dispatch(editRecipe(id, recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipePage);
