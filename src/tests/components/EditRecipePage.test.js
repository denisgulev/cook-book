import React from "react";
import { shallow } from "enzyme";
import recipes from "../fixtures/recipes";
import { EditRecipePage } from "../../components/EditRecipePage";

let editRecipe, removeRecipe, history, wrapper;

beforeEach(() => {
  editRecipe = jest.fn();
  removeRecipe = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditRecipePage
      editRecipe={editRecipe}
      removeRecipe={removeRecipe}
      history={history}
      recipe={recipes[1]}
    />
  );
});

test("should render EditRecipePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle editRecipe", () => {
  wrapper.find("RecipeForm").prop("onSubmit")(recipes[1]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(editRecipe).toHaveBeenLastCalledWith(recipes[1].id, recipes[1]);
});

test("should handle removeRecipe", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(removeRecipe).toHaveBeenLastCalledWith({ id: recipes[1].id });
});
