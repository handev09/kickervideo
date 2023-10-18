import axios from 'axios';

// Action type for updating a client
export const UPDATE_CREW = 'UPDATE_CREW';

// Action creator for updating a client
export const updateCrew = (crewId, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`https://kickervideoapi.vercel.app/api/v1/crew/update/${crewId}`, data);
      // const response = await axios.put(`https://kickervideoapi.vercel.app/api/v1/crew/update/${itemId}`, data);
      const crewData = response.data;

      dispatch({
        type: UPDATE_CREW,
        payload: {
          crewId,
          crewData,
        },
      });
    } catch (error) {
      // Handle error here, e.g. dispatch an action to update error state
      console.error('Error updating crew:', error);
    }
  };
};
