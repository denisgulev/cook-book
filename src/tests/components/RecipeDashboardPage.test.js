import React from "react";
import { shallow } from "enzyme";
import RecipeDashboardPage from "../../components/RecipeDashboardPage";

test("should render RecipeDashboardPage correctly", () => {
  const wrapper = shallow(<RecipeDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
