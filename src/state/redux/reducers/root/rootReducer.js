// rootReducer.js
import { combineReducers } from 'redux';
import budgetReducer from '../budget/budgetReducer';
// import userReducer from './userReducer';

const rootReducer = combineReducers({
  budgets: budgetReducer,
  // users: userReducer,
});

export default rootReducer;
