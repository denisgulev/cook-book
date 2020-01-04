import React from "react";
import { connect } from "react-redux";
import RecipeForm from "./RecipeForm";
import { startEditRecipe, startRemoveRecipe } from "../actions/recipes";
import ConfirmationModal from "./ConfirmationModal";

export class EditRecipePage extends React.Component {
  state = {
    isRemoveRequested: undefined
  };

  onSubmit = recipe => {
    this.props.startEditRecipe(this.props.recipe.id, recipe);
    this.props.history.push("/");
  };

  onRemove = () => {
    this.setState(() => ({ isRemoveRequested: undefined }));
    this.props.startRemoveRecipe({ id: this.props.recipe.id });
    this.props.history.push("/");
  };

  cancelRemove = () => {
    this.setState(() => ({ isRemoveRequested: undefined }));
  };

  handleRemoveRequested = () => {
    this.setState(() => ({ isRemoveRequested: true }));
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Recipe</h1>
          </div>
        </div>
        <div className="content-container">
          <RecipeForm recipe={this.props.recipe} onSubmit={this.onSubmit} />
          <button
            className="button button--secondary"
            onClick={this.handleRemoveRequested}
          >
            Remove Recipe
          </button>
        </div>
        <ConfirmationModal
          isRemoveRequested={this.state.isRemoveRequested}
          handleConfirmation={this.onRemove}
          handleCancellation={this.cancelRemove}
          selectedRecipe={this.props.recipe.title}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  recipe: state.recipes.find(recipe => recipe.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startRemoveRecipe: data => dispatch(startRemoveRecipe(data)),
  startEditRecipe: (id, recipe) => dispatch(startEditRecipe(id, recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipePage);
