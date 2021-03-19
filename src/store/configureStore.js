import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import recipesReducer from '../reducers/recipes';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    recipes: recipesReducer,
    filters: filtersReducer,
    auth: authReducer
}))

export default () => {
    let store =  createStore(
        persistedReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
    let persistor = persistStore(store);

    return { store, persistor };
};

// STORE CREATION
// every action will be dispatched to all reducers, only the one that will handle the action is going
// to include a case statement
