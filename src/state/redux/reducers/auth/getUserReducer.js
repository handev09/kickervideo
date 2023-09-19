// getUserReducer.js
import { GET_USER_SUCCESS, GET_USER_FAILURE } from '../../actions/users/getUser';

const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getUserReducer;
