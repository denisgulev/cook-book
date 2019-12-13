import uuid from "uuid";

// add recipe

export const addRecipe = ({
  title,
  description = "",
  note = "",
  createdAt = 0
} = {}) => ({
  type: "ADD_RECIPE",
  recipe: {
    id: uuid(),
    title,
    description,
    note,
    createdAt
  }
});

// remove recipe

export const removeRecipe = ({ id } = {}) => ({
  type: "REMOVE_RECIPE",
  recipe: {
    id
  }
});

// edit recipe

export const editRecipe = (id, updates) => ({
  type: "EDIT_RECIPE",
  id,
  updates
});
