import recipesReducer from "../../reducers/recipes";
import recipes from "../fixtures/recipes";
import moment from "moment";

test("should set default state", () => {
  const state = recipesReducer(undefined, { type: "@@INIT" });

  expect(state).toEqual([]);
});

test("should remove recipe by id", () => {
  const action = { type: "REMOVE_RECIPE", id: recipes[1].id };

  const state = recipesReducer(recipes, action);

  expect(state).toEqual([recipes[0], recipes[2]]);
});

test("should not remove recipe with not valid id", () => {
  const action = { type: "REMOVE_RECIPE", id: "-1" };

  const state = recipesReducer(recipes, action);

  expect(state).toEqual(recipes);
});

test("should add recipe", () => {
  const recipe = {
    id: "5",
    title: "Ricetta in reducer test",
    description: "How to do in selector test",
    note: "",
    createdAt: moment().add(3, "months")
  };
  const action = {
    type: "ADD_RECIPE",
    recipe
  };

  const state = recipesReducer(recipes, action);

  expect(state).toEqual([...recipes, recipe]);
});

test("should edit a recipe", () => {
  const note = "HELLO WORLD";

  const action = {
    type: "EDIT_RECIPE",
    id: recipes[0].id,
    updates: {
      note
    }
  };

  const state = recipesReducer(recipes, action);

  expect(state[0].note).toBe(note);
});

test("should not edit a recipe if id is not found", () => {
  const note = "HELLO WORLD";

  const action = {
    type: "EDIT_RECIPE",
    id: "-1",
    updates: {
      note
    }
  };

  const state = recipesReducer(recipes, action);

  expect(state).toEqual(recipes);
});

test("should set recipes", () => {
  const action = {
    type: "SET_RECIPES",
    recipes: [recipes[2]]
  };
  const state = recipesReducer(recipes, action);

  expect(state).toEqual([recipes[2]]);
});
