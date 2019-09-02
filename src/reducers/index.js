import { combineReducers } from 'redux';
import { expenses, expensesHaveErrored, expensesAreLoading } from './expense';
export default combineReducers({
    expenses,
    expensesHaveErrored,
    expensesAreLoading
});