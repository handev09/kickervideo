// authActions.js
import axios from 'axios';


// Define action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/auth/login', {
    // const response = await axios.post('https://kickervideoapi.vercel.app/api/v1/auth/login', {
      email,
      password,
    });

    if (response.status === 200) {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data }); // Dispatch success action
    }
    // dispatch(loginSuccess(response.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch({ type: LOGIN_FAILURE, payload: 'Invalid credentials' }); // Dispatch invalid credentials error
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: 'An error occurred' }); // Dispatch general error
    }
  }
};

export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});
