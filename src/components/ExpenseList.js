import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/expenses';

const ExpenseList = (props) => (
	<div>
		<h1>Expense List</h1>
		{props.expenses.map((expense) => {
			return <ExpenseListItem key={expense.id} {...expense} />
		})}
	</div>
);

const mapStateToProps = (state) => {
	// specify what info from the store we want
	// our component to be able to access
	return {
		expenses: getVisibleExpenses(state.expenses, state.filters)
	};
}

export default connect(mapStateToProps)(ExpenseList);