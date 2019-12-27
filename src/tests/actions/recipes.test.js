import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddRecipe,
  addRecipe,
  editRecipe,
  removeRecipe
} from "../../actions/recipes";
import recipes from "../fixtures/recipes";
import db from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

test("should setup remove recipe actions object", () => {
  const action = removeRecipe({ id: "123abc" });

  expect(action).toEqual({
    type: "REMOVE_RECIPE",
    id: "123abc"
  });
});

test("should setup edit recipe object", () => {
  const action = editRecipe("123bca", { note: "New val from test" });

  expect(action).toEqual({
    type: "EDIT_RECIPE",
    id: "123bca",
    updates: {
      note: "New val from test"
    }
  });
});

test("should setup add recipe object", () => {
  const action = addRecipe(recipes[2]);
  expect(action).toEqual({
    type: "ADD_RECIPE",
    recipe: recipes[2]
  });
});

test("should add recipe to database and store", done => {
  const store = createMockStore({});
  const recipeData = {
    description: "Mouse",
    title: "Mouse recipe",
    note: "this one is better",
    createdAt: 1000
  };

  store
    .dispatch(startAddRecipe(recipeData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_RECIPE",
        recipe: { id: expect.any(String), ...recipeData }
      });

      return db.ref(`recipes/${actions[0].recipe.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(recipeData);
      done();
    });
});

test("should add recipe with defaults to database and store", done => {
  const store = createMockStore({});
  const recipeDataDefault = {
    description: "",
    title: "",
    note: "",
    createdAt: 1000
  };

  store
    .dispatch(startAddRecipe({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_RECIPE",
        recipe: { id: expect.any(String), ...recipeDataDefault }
      });

      return db.ref(`recipes/${actions[0].recipe.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(recipeDataDefault);
      done();
    });
});
