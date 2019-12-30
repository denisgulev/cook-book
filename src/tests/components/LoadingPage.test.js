import React from "react";
import { shallow } from "enzyme";
import LoadingPage from "../../components/LoadingPage";

test("should render LoadingPage correctly", () => {
  const wrapper = shallow(<LoadingPage />);

  expect(wrapper).toMatchSnapshot();

  //expect(wrapper.find("h1").text()).toBe("CookBook");
  /* const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  expect(renderer.getRenderOutput()).toMatchSnapshot(); */
});
