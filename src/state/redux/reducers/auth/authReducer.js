
// In your Redux reducers file
const initialState = {
    registrationStatus: '',
    registrationError: '',
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          registrationStatus: 'success',
          registrationError: '',
        };
      case 'REGISTER_FAILURE':
        return {
          ...state,
          registrationStatus: 'failure',
          registrationError: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  