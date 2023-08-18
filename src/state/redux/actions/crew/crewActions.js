// // budgetActions.js
// export const addBudget = (budget) => {
//     return {
//       type: 'ADD_BUDGET',
//       payload: budget,
//     };
//   };
  

import axios from 'axios';

export const addUser = (member) => {
  return async (dispatch) => {
    try {
      // const response = await axios.post('http://localhost:3001/api/v1/crew/create', member);
      const response = await axios.post('https://kickervideoapi.app/api/v1/crew/create', member);
      const newMember = response.data;
      
      dispatch({
        type: 'ADD_MEMBER',
        payload: newMember,
      });
    } catch (error) {
      // Handle error here, e.g. dispatch an action to update error state
      console.error('Error adding member:', error);
    }
  };
};

