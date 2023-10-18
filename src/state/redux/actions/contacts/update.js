import axios from 'axios';

// Action type for updating a client
export const UPDATE_CONTACT = 'UPDATE_CONTACT';

// Action creator for updating a client
export const updateContact = (contactId, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`https://kickervideoapi.vercel.app/api/v1/contacts/update/${contactId}`, data);
      // const response = await axios.put(`https://kickervideoapi.vercel.app/api/v1/contacts/update/${contactId}`, data);
      const contactData = response.data;

      dispatch({
        type: UPDATE_CONTACT,
        payload: {
          contactId,
          contactData,
        },
      });
    } catch (error) {
      // Handle error here, e.g. dispatch an action to update error state
      console.error('Error updating Contact:', error);
    }
  };
};
