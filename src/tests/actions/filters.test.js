import moment from "moment";
import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByDate
} from "../../actions/filters";

test("should generate set start data action object", () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: moment(0)
  });
});

test("should generate set end data action object", () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: moment(0)
  });
});

test("should generate set text filter object with text value", () => {
  const action = setTextFilter("azione");
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    newText: "azione"
  });
});

test("should generate set text filter object with default", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    newText: ""
  });
});

test("should generate sortByDate object", () => {
  expect(sortByDate()).toEqual({
    type: "SORT_BY_DATE"
  });
});
