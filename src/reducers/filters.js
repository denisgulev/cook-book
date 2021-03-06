import * as actions from "../actions/actionTypes";

// FILTER REDUCERS

const filtersReducerDefaultState = {
    text: "",
    sortBy: "category",
    category: "tutte"
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case actions.SET_TEXT_FILTER:
            return {
                ...state,
                text: action.newText
            };
        case actions.SORT_BY_CATEGORY:
            return {
                ...state,
                sortBy: "category"
            };
        case actions.SET_CATEGORY:
            return {
                ...state,
                category: action.category
            };
        default:
            return state;
    }
};

export default filtersReducer;
