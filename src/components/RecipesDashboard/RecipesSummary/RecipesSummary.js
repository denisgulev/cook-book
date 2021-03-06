import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import selectRecipes from "../../../selectors/recipes";

const RecipesSummary = ({visibleRecipesCount, totalRecipesCount, isAuthenticated: isAuthenticated}) => {
    const recipeWord = visibleRecipesCount === 1 ? "recipe" : "recipes";

    let authenticatedOps = null;
    if (isAuthenticated) {
        authenticatedOps = (
            <div className="page-header__actions">
                <button className="button">
                    <Link to="/create">Nuova Ricetta</Link>
                </button>
            </div>
        );
    }

    return (
        <div className="page-header">
            <div className="content-container page-header__content">
                <div className="page-header__info">
                    <h1 className="page-header__title">
                        Viewing <span>{visibleRecipesCount}</span>/<span>{totalRecipesCount}</span> {recipeWord}.
                    </h1>
                </div>
                {
                    authenticatedOps
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const visibleRecipes = selectRecipes(state.recipes, state.filters);

    return {
        visibleRecipesCount: visibleRecipes.length,
        totalRecipesCount: state.recipes.length,
        isAuthenticated: !!state.auth.uid
    };
};

export default connect(mapStateToProps)(RecipesSummary);
