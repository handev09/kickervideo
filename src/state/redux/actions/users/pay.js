// In your Redux actions file
import axios from 'axios';

export const subscribeUser = (paidUser) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/subscription/pay', paidUser);
    // const response = await axios.post('https://kickervideoapi.vercel.app/api/v1/auth/register', userData);
    dispatch({ type: 'SUBSCRIBE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'SUBSCRIBE_FAILURE', payload: error.response.data.error });
  }
};
