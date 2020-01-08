import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Recipe extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container page-header__content">
            <h1 className="page-header__title">Viewing Recipe</h1>
            <Link className="button" to={`/edit/${this.props.recipe.id}`}>
              Edit Recipe
            </Link>
          </div>
        </div>
        <div className="content-container recipe">
          <div className="recipe__content">
            <div className="recipe__image">Recipe Image</div>
            <div className="recipe__ingredients">
              <ul>
                <li>Coffee</li>
                <li>Tea</li>
                <li>Coca Cola</li>
              </ul>
            </div>
          </div>
          <div className="recipe__description">
            <h1>title</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget
              nibh dictum, imperdiet neque vitae, lobortis enim. Nulla
              venenatis, diam et finibus convallis, libero justo efficitur
              nulla, vitae mollis dui lacus at ante. Phasellus sed sollicitudin
              sem. Donec viverra lorem ac tristique elementum. Quisque dapibus
              mollis suscipit. Mauris eleifend, quam vitae maximus tincidunt,
              urna dui volutpat nibh, et rutrum justo turpis eu justo. Nullam
              pellentesque sodales sem sed tincidunt. Vivamus et lobortis ipsum.
              Nullam congue efficitur justo, et congue arcu. Etiam maximus dolor
              ut blandit iaculis. Phasellus porttitor aliquam nibh, non viverra
              odio auctor non. Aliquam malesuada libero sit amet felis vulputate
              elementum. Praesent ex mauris, rutrum eu nulla a, tempus tincidunt
              mi. Maecenas odio urna, vehicula nec venenatis a, dignissim sit
              amet augue. Pellentesque interdum commodo libero ac sodales.
              Curabitur consequat ex massa. Mauris cursus ante nec ex gravida
              bibendum. Quisque lorem massa, pretium ac magna ut, ultricies
              pharetra erat. Cras et lacus dolor. Quisque sed fermentum tortor,
              vitae consectetur risus. Nulla sed commodo dui, eu scelerisque
              elit. Nulla eget felis eros. Sed elit nunc, suscipit vitae tellus
              ac, efficitur gravida risus. Sed id enim at neque aliquam
              molestie.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  recipe: state.recipes.find(recipe => recipe.id === props.match.params.id)
});

export default connect(mapStateToProps, undefined)(Recipe);
