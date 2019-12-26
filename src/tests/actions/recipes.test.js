import { addRecipe, editRecipe, removeRecipe } from "../../actions/recipes";

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
  const recipeData = {
    title: "Prima ricetta test",
    description: "How to do test",
    note: "",
    createdAt: 1000
  };

  const action = addRecipe(recipeData);
  expect(action).toEqual({
    type: "ADD_RECIPE",
    recipe: {
      ...recipeData
    }
  });
});
