import uuid from "uuid";
import db from "../firebase/firebase";
import "firebase/database";

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

export const startRemoveRecipe = ({ id } = {}) => {
  return dispatch => {
    // read data once
    return db
      .ref(`recipes/${id}`)
      .remove()
      .then(() => {
        dispatch(removeRecipe({ id }));
      })
      .catch(e => {
        console.log("Error!", e);
      });
  };
};

// edit recipe

export const editRecipe = (id, updates) => ({
  type: "EDIT_RECIPE",
  id,
  updates
});

export const startEditRecipe = (id, updates) => {
  return dispatch => {
    return db
      .ref(`recipes/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editRecipe(id, updates));
      })
      .catch(e => {
        console.log("Error!", e);
      });
  };
};

// set recipes
export const setRecipes = recipes => ({
  type: "SET_RECIPES",
  recipes
});

// async func that will eventually dispatch 'setRecipes'
export const startSetRecipes = () => {
  const recipesFromDB = [];
  return dispatch => {
    // read data once
    return db
      .ref("recipes")
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
      });
  };
};
