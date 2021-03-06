import * as actions from "../actions/actionTypes";

const recipesReducerDefaultState = [];

const recipesReducer = (state = recipesReducerDefaultState, action) => {
    switch (action.type) {
        case actions.ADD_RECIPE:
            return [...state, action.recipe];
        case actions.REMOVE_RECIPE:
            return state.filter(({id}) => id !== action.id);
        case actions.EDIT_RECIPE:
            return state.map(recipe => {
                if (recipe.id === action.id) {
                    return {
                        ...recipe,
                        ...action.updates
                    };
                } else {
                    return recipe;
                }
            });
        case actions.SET_RECIPES:
            return action.recipes;
        default:
            return state;
    }
};

export default recipesReducer;
