import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { startRemoveRecipe } from "../actions/recipes";

export class Recipe extends React.Component {
  state = {
    isRemoveRequested: undefined
  };

  onRemove = () => {
    this.setState(() => ({ isRemoveRequested: undefined }));
    this.props.startRemoveRecipe({ id: this.props.recipe.id });
    this.props.history.push("/dashboard");
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
          <div className="content-container page-header__content">
            <h1 className="page-header__title">Viewing Recipe</h1>
            {this.props.isAuthenticated ? (
              <React.Fragment>
                <button className="button">
                  <Link to={`/edit/${this.props.recipe.id}`}>Modifica</Link>
                </button>
                <button
                  className="button button--secondary"
                  onClick={this.handleRemoveRequested}
                >
                  Elimina
                </button>
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="content-container recipe">
          <div className="recipe__content">
            <div className="recipe__description">
              <h1>{this.props.recipe.title}</h1>
              <hr />
              <span>PREPARAZIONE </span>
              <span>{30 + " min"}</span>
              <span>DIFFICOLTA' </span>
              <span>{"media"}</span>
              <hr />
            </div>
            <div className="recipe__image">
              <img src={this.props.recipe.imageUrl} alt="Recipe image" />
            </div>
            <div className="recipe__ingredients">
              <span>Ingredienti</span>
              <ul>
                {this.props.recipe.ingredients
                  ? this.props.recipe.ingredients.map(
                      ({ id, name, qty, unit }) => (
                        <li key={id}>
                          {name} - {qty} - {unit}
                        </li>
                      )
                    )
                  : ""}
              </ul>
            </div>
            <div className="recipe__preparation">
              <span>Preparazione:</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                eget nibh dictum, imperdiet neque vitae, lobortis enim. Nulla
                venenatis, diam et finibus convallis, libero justo efficitur
                nulla, vitae mollis dui lacus at ante. Phasellus sed
                sollicitudin sem. Donec viverra lorem ac tristique elementum.
                Quisque dapibus mollis suscipit. Mauris eleifend, quam vitae
                maximus tincidunt, urna dui volutpat nibh, et rutrum justo
                turpis eu justo. Nullam pellentesque sodales sem sed tincidunt.
                Vivamus et lobortis ipsum. Nullam congue efficitur justo, et
                congue arcu. Etiam maximus dolor ut blandit iaculis. Phasellus
                porttitor aliquam nibh, non viverra odio auctor non. Aliquam
                malesuada libero sit amet felis vulputate elementum. Praesent ex
                mauris, rutrum eu nulla a, tempus tincidunt mi. Maecenas odio
                urna, vehicula nec venenatis a, dignissim sit amet augue.
                Pellentesque interdum commodo libero ac sodales. Curabitur
                consequat ex massa. Mauris cursus ante nec ex gravida bibendum.
                Quisque lorem massa, pretium ac magna ut, ultricies pharetra
                erat. Cras et lacus dolor. Quisque sed fermentum tortor, vitae
                consectetur risus. Nulla sed commodo dui, eu scelerisque elit.
                Nulla eget felis eros. Sed elit nunc, suscipit vitae tellus ac,
                efficitur gravida risus. Sed id enim at neque aliquam molestie.
              </p>
            </div>
          </div>
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
  recipe: state.recipes.find(recipe => recipe.id === props.match.params.id),
  isAuthenticated: !!state.auth.uid
});

const mapDispatchToProps = (dispatch, props) => ({
  startRemoveRecipe: data => dispatch(startRemoveRecipe(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
