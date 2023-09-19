import axios from 'axios';

// Define action types
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

// Define the getUser action
export const getUser = (userId) => async (dispatch) => {
  try {
    // Make an API request to fetch user data by userId
    const response = await axios.get(`http://localhost:3001/api/v1/user/me/${userId}`);
    // Replace 'http://localhost:3001/api/v1/users/' with your actual API endpoint

    if (response.status === 200) {
      dispatch({ type: GET_USER_SUCCESS, payload: response.data }); // Dispatch success action
    }
  } catch (error) {
    // Handle errors, e.g., user not found, network error, etc.
    dispatch({ type: GET_USER_FAILURE, payload: 'An error occurred while fetching user data' });
  }
};

// Define the success action creator (optional)
export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

// Define the failure action creator (optional)
export const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error,
});
