import React from "react";
import { shallow } from "enzyme";
import recipes from "../fixtures/recipes";
import RecipeListItem from "../../components/RecipeListItem";

test("should render RecipeListItem correctly", () => {
  const wrapper = shallow(
    <RecipeListItem key={recipes[0].id} {...recipes[0]} />
  );
  expect(wrapper).toMatchSnapshot();
});
