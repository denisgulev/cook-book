import filtersReducer from "../../reducers/filters";
import moment from "moment";

test("should setup default filters value", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });

  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should set sortBy to date", () => {
  const currentState = {
    text: "",
    sortBy: "title",
    startDate: undefined,
    endDate: undefined
  };

  const action = { type: "SORT_BY_DATE" };
  const state = filtersReducer(currentState, action);

  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const newText = "Prova from reducers filters";
  const action = {
    type: "SET_TEXT_FILTER",
    newText
  };

  const state = filtersReducer(undefined, action);

  expect(state.text).toBe(newText);
});

test("should set startDate filter", () => {
  const startDate = moment();
  const action = {
    type: "SET_START_DATE",
    startDate
  };

  const state = filtersReducer(undefined, action);

  expect(state.startDate).toBe(startDate);
});

test("should set endDate filter", () => {
  const endDate = moment();
  const action = {
    type: "SET_END_DATE",
    endDate
  };

  const state = filtersReducer(undefined, action);

  expect(state.endDate).toBe(endDate);
});
