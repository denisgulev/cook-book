import db from "../firebase/firebase";
import "firebase/database";

import * as actions from "./actionTypes";
import {trackPromise} from "react-promise-tracker";

/* WHITOUT DB */
/**
 * component calls action generator
 * action generator returns object
 * component dispatches object
 * redux store changes
 */

/* WITH DB */
/**
 * components calls action generator
 * action generator returns function
 * component dispatches function (?)
 * function runs (has the ability to dispatch other actions)
 */

// add recipe

export const addRecipe = recipe => ({
    type: actions.ADD_RECIPE,
    recipe
});

export const startAddRecipe = (recipeData = {}) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            title = "",
            description = "",
            prepTime = "",
            difficulty = "",
            category = "",
            note = "",
            preparation = "",
            createdAt = 1000,
            createdBy = uid,
            imageUrl = "",
            ingredients = []
        } = recipeData;

        const recipe = {
            title,
            description,
            prepTime,
            difficulty,
            category,
            note,
            preparation,
            createdAt,
            imageUrl,
            createdBy,
            ingredients
        };

        await trackPromise(
            db.ref(`recipes`)
                .push(recipe)
                .then(ref => {
                    dispatch(
                        addRecipe({
                            id: ref.key,
                            ...recipe
                        })
                    );
                })
        );
    };
};

// remove recipe

export const removeRecipe = ({id} = {}) => ({
    type: actions.REMOVE_RECIPE,
    id
});

export const startRemoveRecipe = ({id} = {}) => {
    return async (dispatch, getState) => {
        // read data once
        await trackPromise(
            db.ref(`recipes/${id}`)
                .remove()
                .then(() => dispatch(removeRecipe({id})))
                .catch(error => console.log("Error - startRemoveRecipe", error))
        );
    };
};

// edit recipe

export const editRecipe = (id, updates) => ({
    type: actions.EDIT_RECIPE,
    id,
    updates
});

export const startEditRecipe = (id, updates) => {
    return async (dispatch, getState) => {
        await db.ref(`recipes/${id}`)
            .update(updates)
            .then(() => {
                dispatch(editRecipe(id, updates));
            })
            .catch(error => console.log("Error - startEditRecipe", error));
    };
};

// set recipes
export const setRecipes = recipes => ({
    type: actions.SET_RECIPES,
    recipes
});

// async func that will eventually dispatch 'setRecipes'
export const startSetRecipes = () => {
    const recipesFromDB = [];
    return async (dispatch, getState) => {
        const snapshot = await trackPromise(db.ref(`recipes`).once("value"));

        if (snapshot) {
            snapshot.forEach(child => {
                recipesFromDB.push({
                    id: child.key,
                    ...child.val()
                });
            });
            dispatch(setRecipes(recipesFromDB));
        } else {
            console.log("Error startSetRecipes");
        }
        // const uid = getState().auth.uid;
        // read data once
        /* return db
          .ref(`recipes`)
          .once("value")
          .then(snapshot => {
            // parse data
            snapshot.forEach(child => {
              recipesFromDB.push({
                id: child.key,
                ...child.val()
              });
            });

            dispatch(setRecipes(recipesFromDB));
          })
          .catch(e => {
            console.log("Error!", e);
          }); */
    };
};
