import React from "react";
import { shallow } from "enzyme";
import { RecipeList } from "../../components/RecipeList";
import recipes from "../fixtures/recipes";

test("should render RecipeList with recipes", () => {
  const wrapper = shallow(<RecipeList recipes={recipes} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render RecipeList with empty message", () => {
  const wrapper = shallow(<RecipeList recipes={[]} />);
  expect(wrapper).toMatchSnapshot();
});
