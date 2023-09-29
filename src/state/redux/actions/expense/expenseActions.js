import axios from 'axios';

export const addExpense = (expense) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/expense/create', expense);
      // const response = await axios.post('https://kickervideoapi.vercel.app/api/v1/expense/create', expense);
      const newExpense = response.data;
      
      dispatch({
        type: 'ADD_EXPENSE',
        payload: newExpense,
      });
    } catch (error) {
      // Handle error here, e.g. dispatch an action to update error state
      console.error('Error adding expense:', error);
    }
  };
};

