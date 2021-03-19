import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import ConfirmationModal from "../modals/ConfirmationModal";
import {startRemoveRecipe} from "../../actions/recipes";

import Slideshow from "./Slideshow/Slideshow";

export class Recipe extends React.Component {
    state = {
        isRemoveRequested: undefined
    };

    onRemove = () => {
        this.setState(() => ({isRemoveRequested: undefined}));
        this.props.startRemoveRecipe({id: this.props.recipe.id});
        this.props.history.push("/");
    };

    cancelRemove = () => {
        this.setState(() => ({isRemoveRequested: undefined}));
    };

    handleRemoveRequested = () => {
        this.setState(() => ({isRemoveRequested: true}));
    };

    render() {
        const index = this.props.match.params.id;
        //console.log("THIS.PROPS - ", this.props)
        const {title, prepTime, difficulty, imageUrl, ingredients, note, preparation} = this.props.recipe;

        let imagesForSlideshow = this.props.recipe.imageUrl.map(({ url }) => ({"url": url}));

        //console.log('slideshow - ', imagesForSlideshow)

        let authenticatedManagement = null;
        if (this.props.isAuthenticated) {
            authenticatedManagement = (
                <div className="page-header__actions">
                    <button className="button">
                        <Link to={`/edit/${index}`}>Modifica</Link>
                    </button>
                    <button className="button button--danger" onClick={this.handleRemoveRequested}>
                        Elimina
                    </button>
                </div>
            );
        }

        let ingredientsShow = null;
        if (ingredients) {
            ingredientsShow = (
                ingredients.map(({name, qty, unit}, index) => (
                    <li key={index}>
                        {name} - {qty} - {unit}
                    </li>
                ))
            );
        }

        return (
            <div>
                <div className="page-header">
                    <div className="content-container page-header__content">
                        <h1 className="page-header__title">Viewing Recipe</h1>
                        {
                            authenticatedManagement
                        }
                    </div>
                </div>
                <div className="content-container recipe">
                    <div className="recipe__content">
                        <div className="recipe__description">
                            <h1>{title}</h1>
                            <div>
                                <span>PREPARAZIONE </span>
                                <span>{prepTime ? prepTime + " min" : ""}</span>
                            </div>
                            <div>
                                <span>DIFFICOLTA' </span>
                                <span>{difficulty}</span>
                            </div>
                        </div>
                        <div className="recipe__image">
                            { /*<img src={imageUrl} alt="Recipe image"/> */ }
                            <Slideshow imgs={imagesForSlideshow} />
                        </div>
                        <div className="recipe__ingredients">
                            <div>
                                <span>Ingredienti</span>
                                <ul>
                                    {
                                        ingredientsShow
                                    }
                                </ul>
                            </div>
                            <div className="recipe__ingredients__note">
                                <span>Note:</span>
                                <p>{note}</p>
                            </div>
                        </div>
                        <div className="recipe__preparation">
                            <span>Preparazione:</span>
                            <p>
                                {preparation}
                            </p>
                        </div>
                    </div>
                </div>
                <ConfirmationModal
                    isRemoveRequested={this.state.isRemoveRequested}
                    handleConfirmation={this.onRemove}
                    handleCancellation={this.cancelRemove}
                    selectedRecipe={title}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    //console.log("Redux recipes - ",state.recipes)
    return {
        recipe: state.recipes[props.match.params.id],
        isAuthenticated: !!state.auth.uid
    };
}


const mapDispatchToProps = (dispatch) => ({
    startRemoveRecipe: data => dispatch(startRemoveRecipe(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
