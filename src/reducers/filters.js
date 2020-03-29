import moment from 'moment';

// FILTER REDUCERS

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'category',
  category: 'tutte'
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.newText
      };
    case 'SORT_BY_CATEGORY':
      return {
        ...state,
        sortBy: 'category'
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.category
      };
    default:
      return state;
  }
};

export default filtersReducer;
