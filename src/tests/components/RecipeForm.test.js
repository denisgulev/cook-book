import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import RecipeForm from "../../components/RecipeForm";
import recipes from "../fixtures/recipes";

test("should render RecipeForm correctly", () => {
  const wrapper = shallow(<RecipeForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should RecipeForm with recipe data", () => {
  const wrapper = shallow(<RecipeForm recipe={recipes[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
  const wrapper = shallow(<RecipeForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
  const value = "New description";
  const wrapper = shallow(<RecipeForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("description")).toBe(value);
});

test("should set note on textarea change", () => {
  const value = "New note value";
  const wrapper = shallow(<RecipeForm />);
  wrapper.find("textarea").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("note")).toBe(value);
});

test("should set title on input change", () => {
  const value = "New title value";
  const wrapper = shallow(<RecipeForm />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("title")).toBe(value);
});

test("should call onSubmit prop for valid form submission", () => {
  // spy function to check correct submission of form
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <RecipeForm recipe={recipes[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: recipes[0].description,
    title: recipes[0].title,
    note: recipes[0].note,
    createdAt: recipes[0].createdAt
  });
});

test("should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<RecipeForm />);
  wrapper.find("SingleDatePicker").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("should set calendar focus on change", () => {
  const focused = true;
  const wrapper = shallow(<RecipeForm />);
  wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
  expect(wrapper.state("calendarFocused")).toBe(focused);
});
