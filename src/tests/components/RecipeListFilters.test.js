import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import { RecipeListFilters } from "../../components/RecipeListFilters";
import { filters, altFilters } from "../fixtures/filters";

let setTextFilter, sortByDate, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <RecipeListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render RecipeListFilters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render RecipeListFilters with alt data correctly", () => {
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  const value = "Ricet";
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: {
        value
      }
    });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("should sortByDate", () => {
  const value = "date";
  wrapper.setProps({ filters: altFilters });
  wrapper.find("select").simulate("change", {
    target: {
      value
    }
  });
  expect(sortByDate).toHaveBeenCalled();
});

test("should handle date changes", () => {
  const startDate = moment(0).add(4, "years");
  const endDate = moment(0).add(7, "years");
  wrapper.find("DateRangePicker").prop("onDatesChange")({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("should handle date focus change", () => {
  const focused = "endDate";
  wrapper.find("DateRangePicker").prop("onFocusChange")(focused);
  expect(wrapper.state("calendarFocused")).toBe(focused);
});
