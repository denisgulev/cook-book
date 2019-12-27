import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddRecipe,
  addRecipe,
  editRecipe,
  removeRecipe,
  setRecipes,
  startSetRecipes,
  startRemoveRecipe,
  startEditRecipe
} from "../../actions/recipes";
import recipes from "../fixtures/recipes";
import db from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

// done is used to allow population before starting tests defined below
beforeEach(done => {
  const recipeData = {};
  recipes.forEach(({ id, title, description, note, createdAt }) => {
    recipeData[id] = { title, description, note, createdAt };
  });
  db.ref("recipes")
    .set(recipeData)
    .then(() => {
      done();
    });
});

test("should setup remove recipe actions object", () => {
  const action = removeRecipe({ id: "123abc" });

  expect(action).toEqual({
    type: "REMOVE_RECIPE",
    id: "123abc"
  });
});

test("should remove expense from firebase", done => {
  const store = createMockStore({});
  const id = recipes[0].id;
  store
    .dispatch(startRemoveRecipe({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_RECIPE",
        id
      });
      return db.ref(`recipes/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
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

test("should edit recipe from firebase", done => {
  const store = createMockStore({});
  const id = recipes[0].id;
  const updates = {
    title: "DONE FOR START_EDIT_RECIPE",
    note: "27-12-2019"
  };

  store
    .dispatch(startEditRecipe(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_RECIPE",
        id,
        updates
      });
      return db.ref(`recipes/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val().title).toBe(updates.title);
      done();
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

test("should setup set recipes object with data", () => {
  const action = setRecipes(recipes);
  expect(action).toEqual({
    type: "SET_RECIPES",
    recipes
  });
});

test("should fetch recipes from firebase", done => {
  const store = createMockStore({});
  store.dispatch(startSetRecipes()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_RECIPES",
      recipes
    });
    done();
  });
});
