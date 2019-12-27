import uuid from "uuid";
import db from "../firebase/firebase";

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
  type: "ADD_RECIPE",
  recipe
});

export const startAddRecipe = (recipeData = {}) => {
  return dispatch => {
    const {
      title = "",
      description = "",
      note = "",
      createdAt = 1000
    } = recipeData;

    const recipe = { title, description, note, createdAt };

    return db
      .ref("recipes")
      .push(recipe)
      .then(ref => {
        dispatch(
          addRecipe({
            id: ref.key,
            ...recipe
          })
        );
      });
  };
};

// remove recipe

export const removeRecipe = ({ id } = {}) => ({
  type: "REMOVE_RECIPE",
  id
});

// edit recipe

export const editRecipe = (id, updates) => ({
  type: "EDIT_RECIPE",
  id,
  updates
});
