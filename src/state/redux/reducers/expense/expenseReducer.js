const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      console.log("Adding an expense...");
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "FETCH_EXPENSE_SUCCESS":
      console.log("Fetching expenses was successful.");
      console.log("Payload:", action.payload);
      return {
        ...state,
        expenses: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_EXPENSE_FAILURE":
      console.log("Fetching expenses failed.");
      console.log("Error:", action.payload);
      return {
        ...state,
        expenses: [],
        loading: false,
        error: action.payload,
      };
    case "DELETE_EXPENSE":
      console.log("Deleting an expense...");
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      return {
        ...state,
        expenses: updatedExpenses,
      };
    default:
      return state;
  }
};

export default expenseReducer;
