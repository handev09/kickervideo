import axios from 'axios';

// Action type for updating a client
export const UPDATE_ITEM = 'UPDATE_ITEM';

// Action creator for updating a client
export const updateItem = (itemId, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/v1/items/update/${itemId}`, data);
      // const response = await axios.put(`https://kickervideoapi.vercel.app/api/v1/clients/update/${clientId}`, updatedClientData);
      const itemData = response.data;

      dispatch({
        type: UPDATE_ITEM,
        payload: {
          itemId,
          itemData,
        },
      });
    } catch (error) {
      // Handle error here, e.g. dispatch an action to update error state
      console.error('Error updating item:', error);
    }
  };
};
