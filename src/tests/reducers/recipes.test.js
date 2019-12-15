import recipesReducer from "../../reducers/recipes";
import recipes from "../fixtures/recipes";

test("should set default state", () => {
  const state = recipesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove recipe by id", () => {
  const action = { type: "REMOVE_RECIPE", id: recipes[1].id };
  const state = recipesReducer(recipes, action);

  expect(state).toEqual([recipes[0], recipes[2], recipes[3]]);
});

test("should not remove recipe if id not found", () => {
  const action = { type: "REMOVE_RECIPE", id: "-1" };
  const state = recipesReducer(recipes, action);

  expect(state).toEqual(recipes);
});

test("should add new recipe", () => {
  const recipe = {
    id: "11",
    title: "For test",
    description: "How to do",
    createdAt: "012345676"
  };
  const action = {
    type: "ADD_RECIPE",
    recipe
  };
  const state = recipesReducer(recipes, action);

  expect(state).toEqual([...recipes, recipe]);
});

test("should edit a recipe with a valid provided id", () => {
  const action = {
    type: "EDIT_RECIPE",
    id: recipes[2].id,
    updates: {
      description: "Come si prepara"
    }
  };
  const state = recipesReducer(recipes, action);

  expect(state[2].description).toBe(action.updates.description);
});

test("should NOT edit a recipe with not valid provided id", () => {
  const action = {
    type: "EDIT_RECIPE",
    id: "-1",
    updates: {
      description: "Come si prepara"
    }
  };
  const state = recipesReducer(recipes, action);

  expect(state).toEqual(recipes);
});
