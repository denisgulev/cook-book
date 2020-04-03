import * as actions from "./actionTypes";

export const setTextFilter = (newText = "") => ({
  type: actions.SET_TEXT_FILTER,
  newText
});

export const setCategory = category => ({
  type: actions.SET_CATEGORY,
  category
});
