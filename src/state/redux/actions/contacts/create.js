import axios from 'axios';

export const addContact = (contact) => {
  return async (dispatch) => {
    try {
      // const response = await axios.post('http://localhost:3001/api/v1/contacts/create', contact);
      const response = await axios.post('https://kickervideoapi.vercel.app/api/v1/contacts/create', contact);
      const newContact = response.data;
      
      dispatch({
        type: 'ADD_CONTACT',
        payload: newContact,
      });
    } catch (error) {
      // Handle error here, e.g. dispatch an action to update error state
      console.error('Error adding contact:', error);
    }
  };
};

