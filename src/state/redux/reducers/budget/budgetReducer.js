// // budgetReducer.js
// const initialState = {
//     budgets: [],
//     loading: false,
//     error: null,
//   };
  
//   const budgetReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'ADD_BUDGET':
//         return {
//           ...state,
//           budgets: [...state.budgets, action.payload],
//         };
//         case "FETCH_USER_BUDGETS_SUCCESS":
//       return {
//         ...state,
//         budgets: action.payload,
//         loading: false,
//         error: null,
//       };
//     case "FETCH_USER_BUDGETS_FAILURE":
//       return {
//         ...state,
//         budgets: [],
//         loading: false,
//         error: action.payload,
//       };
//       default:
//         return state;
//     }
//   };
  
//   export default budgetReducer;
  
// budgetReducer.js
// import {
//   ADD_BUDGET,
//   FETCH_USER_BUDGETS_SUCCESS,
//   FETCH_USER_BUDGETS_FAILURE,
//   UPDATE_BUDGET_SUCCESS, // Import the new action type
// } from './actions/'; // Import your action type constants

const initialState = {
  budgets: [],
  loading: false,
  error: null,
};

const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BUDGET':
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      };
    case 'FETCH_USER_BUDGETS_SUCCESS':
      return {
        ...state,
        budgets: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_USER_BUDGETS_FAILURE':
      return {
        ...state,
        budgets: [],
        loading: false,
        error: action.payload,
      };
    case 'UPDATE_BUDGET_SUCCESS':
      // Find the index of the budget to update in the budgets array
      const updatedIndex = state.budgets.findIndex(
        (budget) => budget.budgetId === action.payload.budgetId
      );

      if (updatedIndex === -1) {
        // If the budget is not found, return the state as is
        return state;
      }

      // Create a new array with the updated budget at the found index
      const updatedBudgets = [...state.budgets];
      updatedBudgets[updatedIndex] = action.payload;

      return {
        ...state,
        budgets: updatedBudgets,
      };

      case "DELETE_BUDGET":
      console.log("Deleting an budget...");
      const updatedBudgetz = state.budgets.filter(
        (budget) => budget.budget_id !== action.payload
      );
      return {
        ...state,
        clients: updatedBudgetz,
      };
    default:
      return state;
  }
};

export default budgetReducer;
