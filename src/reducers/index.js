import { combineReducers } from 'redux';
import { expenses, expensesHaveErrored, expensesAreLoading } from './expense';
import {locale} from "./locale";

export default combineReducers({
    expenses,
    expensesHaveErrored,
    expensesAreLoading,
    locale
});