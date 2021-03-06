import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import recipesReducer from '../reducers/recipes';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

export default () => {
    return createStore(
        combineReducers({
            recipes: recipesReducer,
            filters: filtersReducer,
            auth: authReducer
        }),
        composeWithDevTools(applyMiddleware(thunk))
    );
};

// STORE CREATION
// every action will be dispatched to all reducers, only the one that will handle the action is going
// to include a case statement
