import axios from 'axios';

// Action type for updating a client
export const UPDATE_CLIENT = 'UPDATE_CLIENT';

// Action creator for updating a client
export const updateClient = (clientId, updatedClientData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/v1/clients/update/${clientId}`, updatedClientData);
      // const response = await axios.put(`https://kickervideoapi.vercel.app/api/v1/clients/update/${clientId}`, updatedClientData);
      const updatedClient = response.data;

      dispatch({
        type: UPDATE_CLIENT,
        payload: {
          clientId,
          updatedClient,
        },
      });
    } catch (error) {
      // Handle error here, e.g. dispatch an action to update error state
      console.error('Error updating client:', error);
    }
  };
};
