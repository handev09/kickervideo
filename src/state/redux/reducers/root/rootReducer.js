// rootReducer.js
import { combineReducers } from 'redux';
import budgetReducer from '../budget/budgetReducer';
import userReducer from '../users/usersReducer';
import authReducer from '../auth/authReducer';
import loginReducer from '../auth/loginReducer';
import crewReducer from '../crew/crewReducer';
import expenseReducer from '../expense/expenseReducer'
import subscribeReducer from '../auth/subscribe';
import getUserReducer from '../auth/getUserReducer';

const rootReducer = combineReducers({
  budgets: budgetReducer,
  users: userReducer,
  auth: authReducer,
  login: loginReducer,
  crew: crewReducer,
  expenses: expenseReducer,
  sub: subscribeReducer,
  user: getUserReducer,
});

export default rootReducer;
