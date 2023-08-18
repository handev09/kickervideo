// budgetReducer.js
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
        case "FETCH_USER_BUDGETS_SUCCESS":
      return {
        ...state,
        budgets: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_USER_BUDGETS_FAILURE":
      return {
        ...state,
        budgets: [],
        loading: false,
        error: action.payload,
      };
      default:
        return state;
    }
  };
  
  export default budgetReducer;
  