import { createStore } from 'redux';

// Action generators - f that return action objects

const incrementCount = ({ incrementBy = 1 } = {}) => ({
	type: 'INCREMENT',
	incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
	type: 'DECREMENT',
	decrementBy: decrementBy
});

const setCount = ({ count } = {}) => ({
	type: 'SET',
	count
});

const resetCount = () => ({
	type: 'RESET'
});

// REDUCERS
/**
 * 1. Reducers are pure functions
 * 		- the output is determined by the input
 * 2. Never change state or action
 */

const store = createStore((state = { count: 0 }, action) => {
	switch(action.type) {
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy
			}
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
			}
		case 'RESET':
			return {
				count: 0
			}
		case 'SET':
			return  {
				count: action.count
			}
		default:
				return state
	}
});

// calls the function inside everytime the store changes
const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
})

// ACTION - object sent to the store
// increment, decrement, reset
/* store.dispatch({
	type: 'INCREMENT',
	incrementBy: 5
}); */

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(decrementCount());

store.dispatch(setCount({ count: 5 }));
