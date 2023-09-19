// In your Redux actions file
import axios from 'axios';

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/auth/register', userData);
    // const response = await axios.post('https://kickervideoapi.vercel.app/api/v1/auth/register', userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data.error });
  }
};
