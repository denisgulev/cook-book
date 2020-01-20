import React from "react";
import { connect } from "react-redux";
import RecipeForm from "./RecipeForm";
import { startEditRecipe } from "../actions/recipes";

export class EditRecipePage extends React.Component {
  onSubmit = recipe => {
    this.props.startEditRecipe(this.props.recipe.id, recipe);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Recipe</h1>
          </div>
        </div>
        <div className="content-container recipe">
          <RecipeForm recipe={this.props.recipe} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  recipe: state.recipes.find(recipe => recipe.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditRecipe: (id, recipe) => dispatch(startEditRecipe(id, recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipePage);
