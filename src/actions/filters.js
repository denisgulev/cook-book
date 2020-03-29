// set text filter

export const setTextFilter = (newText = '') => ({
  type: 'SET_TEXT_FILTER',
  newText
});

export const setCategory = category => ({
  type: 'SET_CATEGORY',
  category
});
