import filtersReducer from "../../reducers/filters";
import moment from "moment";

test("should setup default fulter values", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

// sortBy = 'date' by default
test("should set sortBy to date", () => {
  const currentState = {
    text: "",
    startDate: undefined,
    endDate: undefined,
    sortBy: "amount"
  };
  const action = { type: "SORT_BY_DATE" };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const text = "New text set";
  const state = filtersReducer(undefined, {
    type: "SET_TEXT_FILTER",
    newText: text
  });
  expect(state.text).toBe(text);
});

test("should set start date", () => {
  const newStartDate = moment(0).add(1, "days");
  const state = filtersReducer(undefined, {
    type: "SET_START_DATE",
    startDate: newStartDate
  });
  expect(state.startDate).toEqual(newStartDate);
});

test("should set end date", () => {
  const newEndDate = moment(0).add(4, "days");
  const state = filtersReducer(undefined, {
    type: "SET_START_DATE",
    startDate: newEndDate
  });
  expect(state.startDate).toEqual(newEndDate);
});
