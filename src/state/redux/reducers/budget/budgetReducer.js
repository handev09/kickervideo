// budgetReducer.js
const initialState = {
    budgets: [],
  };
  
  const budgetReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_BUDGET':
        return {
          ...state,
          budgets: [...state.budgets, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default budgetReducer;
  