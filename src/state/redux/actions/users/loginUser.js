// authActions.js
import axios from 'axios';

export const loginRequest = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/auth/login', {
      email,
      password,
    });
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.error));
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
