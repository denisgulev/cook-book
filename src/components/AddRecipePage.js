import React from 'react';
import RecipeForm from './RecipeForm';
import { connect } from 'react-redux';
import { startAddRecipe } from '../actions/recipes';

export class AddRecipePage extends React.Component {
  onSubmit = recipe => {
    this.props.startAddRecipe(recipe);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Recipe</h1>
          </div>
        </div>
        <div className="content-container recipe">
          <RecipeForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddRecipe: recipe => dispatch(startAddRecipe(recipe))
});

export default connect(undefined, mapDispatchToProps)(AddRecipePage);
