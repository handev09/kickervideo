// rootReducer.js
import { combineReducers } from 'redux';
import budgetReducer from '../budget/budgetReducer';
import userReducer from '../users/usersReducer';
import authReducer from '../auth/authReducer';
import loginReducer from '../auth/loginReducer';

const rootReducer = combineReducers({
  budgets: budgetReducer,
  users: userReducer,
  auth: authReducer,
  login: loginReducer
});

export default rootReducer;
