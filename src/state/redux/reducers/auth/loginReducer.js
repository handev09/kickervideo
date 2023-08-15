import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../../actions/users/loginUser';

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
        error: action.payload
      };
    default:
      return state;
  }
};

export default loginReducer;


// // reducers/authReducer.js

// import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActions';

// const initialState = {
//   loginError: null
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         loginError: null
//       };
//     case LOGIN_FAILURE:
//       return {
//         ...state,
//         loginError: action.payload
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;

