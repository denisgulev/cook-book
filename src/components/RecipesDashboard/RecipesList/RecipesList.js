import React from "react";
import {connect} from "react-redux";
import RecipeListItem from "./RecipesListItem/RecipesListItem";
import getVisibleRecipes from "../../../selectors/recipes";
import {startLogout} from "../../../actions/auth";

export const RecipesList = props => {
    let recipesList = <p>Nessuna ricetta</p>
    if (props.recipes.length !== 0) {
        recipesList = (
            props.recipes.map((recipe, index) => {
                return <RecipeListItem key={index} {...recipe} />;
            })
        );
    }

    const onSubmit = e => {
        // prevent default page refresh
        e.preventDefault();
        props.startLogout();
    };

    return (
        <div className="content-container">
            {
                props.isAuthenticated ?
                    <form onSubmit={onSubmit} className="box-layout__box-login">
                        <button className="button">Logout</button>
                    </form>
                    :
                    ''
            }
            <div className="list-body">
                {
                    recipesList
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    // specify what info from the store we want
    // our component to be able to access
    recipes: getVisibleRecipes(state.recipes, state.filters),
    isAuthenticated: !!state.auth.uid
});

const mapDispatchToProps = dispatch => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);
