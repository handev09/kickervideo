// // budgetActions.js
// export const addBudget = (budget) => {
//     return {
//       type: 'ADD_BUDGET',
//       payload: budget,
//     };
//   };
  

import axios from 'axios';

export const addItem = (item) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/items/create', item);
      // const response = await axios.post('https://kickervideoapi.vercel.app/api/v1/crew/create', member);
      const newItem = response.data;
      
      dispatch({
        type: 'ADD_ITEM',
        payload: newItem,
      });
    } catch (error) {
      // Handle error here, e.g. dispatch an action to update error state
      console.error('Error adding member:', error);
    }
  };
};

