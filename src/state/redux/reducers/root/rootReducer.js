/** @format */

// rootReducer.js
import { combineReducers } from "redux";
import budgetReducer from "../budget/budgetReducer";
import userReducer from "../users/usersReducer";
import authReducer from "../auth/authReducer";
import loginReducer from "../auth/loginReducer";
import crewReducer from "../crew/crewReducer";
import expenseReducer from "../expense/expenseReducer";
import subscribeReducer from "../auth/subscribe";
import getUserReducer from "../auth/getUserReducer";
import itemsReducer from "../items/itemsReducer";
import clientsReducer from "../clients/clientsReducer";
import contactsReducer from "../contacts/contactsReducer";

const rootReducer = combineReducers({
    budgets: budgetReducer,
    users: userReducer,
    auth: authReducer,
    login: loginReducer,
    crew: crewReducer,
    expenses: expenseReducer,
    sub: subscribeReducer,
    user: getUserReducer,
    items: itemsReducer,
    clients: clientsReducer,
    contacts: contactsReducer,
});

export default rootReducer;
