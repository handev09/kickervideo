// // budgetActions.js
// export const addBudget = (budget) => {
//     return {
//       type: 'ADD_BUDGET',
//       payload: budget,
//     };
//   };
  

import axios from 'axios';

export const addBudget = (budget) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/budget/create', budget);
      const newBudget = response.data;
      
      dispatch({
        type: 'ADD_BUDGET',
        payload: newBudget,
      });
    } catch (error) {
      // Handle error here, e.g. dispatch an action to update error state
      console.error('Error adding budget:', error);
    }
  };
};

