// // budgetActions.js
// export const addBudget = (budget) => {
//     return {
//       type: 'ADD_BUDGET',
//       payload: budget,
//     };
//   };
  

import axios from 'axios';

export const addClient = (item) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/clients/create', item);
      // const response = await axios.post('https://kickervideoapi.vercel.app/api/v1/items/create', item);
      const newClient = response.data;
      
      dispatch({
        type: 'ADD_CLIENT',
        payload: newClient,
      });
    } catch (error) {
      // Handle error here, e.g. dispatch an action to update error state
      console.error('Error adding client:', error);
    }
  };
};

