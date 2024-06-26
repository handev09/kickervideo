// Create a new action creator for deleting expenses
import axios from 'axios';
export const deleteItem = (itemId) => {
  return async (dispatch) => {
    try {
      // await axios.delete(`http://localhost:3001/api/v1/items/delete/${itemId}`);
      const response = await axios.delete(`https://kickervideoapi.vercel.app/api/v1/items/delete/${itemId}`);
      
      // Dispatch an action to remove the deleted expense from the state
      dispatch({
        type: 'DELETE_ITEM',
        payload: itemId, // Send the ID of the deleted expense
      });
    } catch (error) {
      // Handle error here, e.g. dispatch an action to update error state
      console.error('Error deleting item:', error);
    }
  };
};