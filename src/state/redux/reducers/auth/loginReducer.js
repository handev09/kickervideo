// authReducer.js
const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
