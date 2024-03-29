import React from "react";
import { shallow } from "enzyme";
import recipes from "../fixtures/recipes";
import { EditRecipePage } from "../../components/EditRecipePage";

let startEditRecipe, startRemoveRecipe, history, wrapper;

beforeEach(() => {
  startEditRecipe = jest.fn();
  startRemoveRecipe = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditRecipePage
      startEditRecipe={startEditRecipe}
      startRemoveRecipe={startRemoveRecipe}
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
  expect(startEditRecipe).toHaveBeenLastCalledWith(recipes[1].id, recipes[1]);
});

test("should handle startRemoveRecipe", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startRemoveRecipe).toHaveBeenLastCalledWith({ id: recipes[1].id });
});
