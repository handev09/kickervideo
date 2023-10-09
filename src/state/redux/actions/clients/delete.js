// Create a new action creator for deleting expenses
import axios from 'axios';
export const deleteClient = (clientId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/clients/delete/${clientId}`);
      // const response = await axios.delete(`https://kickervideoapi.vercel.app/api/v1/expense/delete/${expenseId}`);
      
      // Dispatch an action to remove the deleted expense from the state
      dispatch({
        type: 'DELETE_CLIENT',
        payload: clientId, // Send the ID of the deleted expense
      });
    } catch (error) {
      // Handle error here, e.g. dispatch an action to update error state
      console.error('Error deleting client:', error);
    }
  };
};