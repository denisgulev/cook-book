import { addRecipe, editRecipe, removeRecipe } from "../../actions/recipes";

test("should setup remove recipe action object", () => {
  const action = removeRecipe({ id: "123abc" });

  expect(action).toEqual({
    type: "REMOVE_RECIPE",
    id: "123abc"
  });
});

test("should update recipe action object", () => {
  const action = editRecipe("321cba", { note: "New note value" });

  expect(action).toEqual({
    type: "EDIT_RECIPE",
    id: "321cba",
    updates: {
      note: "New note value"
    }
  });
});
