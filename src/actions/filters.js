// set text filter

export const setTextFilter = (newText = "") => ({
  type: "SET_TEXT_FILTER",
  newText
});

// set sort by date

export const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

// set start date

export const setStartDate = startDate => ({
  type: "SET_START_DATE",
  startDate
});

// set end date

export const setEndDate = endDate => ({
  type: "SET_END_DATE",
  endDate
});
