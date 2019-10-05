import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD
const addExpense = (
	{
		description = '',
		notes = '',
		amount = 0,
		createdAt = 0 
	} = {}
) => ({
	type: 'ADD',
	expense: {
		id: uuid(),
		description,
		notes,
		amount,
		createdAt
	}
});

// REMOVE
const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE',
	id
});

// EDIT
const editExpense = (id, updates) => ({
	type: 'EDIT',
	id,
	updates
});

// SET_TEXT
const setTextFilter = (text = '') => ({
	type: 'SET_TEXT',
	text
});

// SORT_BY_DATE/AMOUNT
const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
	type: 'SORT_BY_DATE'
});

// SET_START_DATE
const setStartDate = (startDate) => ({
	type: 'SET_START_DATE',
	startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
	type: 'SET_END_DATE',
	endDate
});

// Expenses reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch(action.type) {
		case 'ADD':
			return [
				...state,
				action.expense
			];
		case 'REMOVE':
			return state.filter(({ id }) => id !== action.id);
		case 'EDIT':
			return state.map((expense) => {
				if (expense.id === action.id) {
					return {
						...expense,
						...action.updates
					};
				} else {
					return expense;
				}
			})
		default:
			return state;
	}
};

// Filters reducer

const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch(action.type) {
		case 'SET_TEXT':
			return {
				...state,
				text: action.text
			};
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy: 'amount'
			};
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy: 'date'
			};
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.startDate
			};
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.endDate
			};
		default:
			return state;
	}
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses.filter((expense) => {
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

		// expense.description has the text variable inside of it?


		return startDateMatch && endDateMatch && textMatch;
	}).sort((a, b) => {
		if (sortBy === 'date') {
			return a.createdAt < b.createdAt ? 1 : -1;
		} else if (sortBy === 'amount') {
			return a.amount < b.amount ? 1 /**b will come first in the list */ : -1;
		}
	});
};

// Store creation

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer
	})
);

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));
store.dispatch(sortByAmount());
/*
store.dispatch(setTextFilter('fe'));
store.dispatch(removeExpense({ id: expenseOne.expense.id }));

store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

store.dispatch(setTextFilter());

store.dispatch(sortByDate());

store.dispatch(setStartDate());
store.dispatch(setEndDate());
store.dispatch(setStartDate(0));
store.dispatch(setEndDate(999));
*/

const demoState = {
	expenses: [{
		id: 'asdnasd',
		description: 'January rent',
		note: 'Final payment for new year',
		amount: 50000,
		createdAt: 0
	}],
	filters: {
		text: 'rent',
		sortBy: 'amount', // date or amount
		startDate: undefined,
		endDate: undefined
	}
};