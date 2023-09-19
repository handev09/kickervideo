
// In your Redux reducers file
const initialState = {
    subscription: '',
    subscriptionError: '',
  };
  
  const subscribeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SUBSCRIBE_SUCCESS':
        return {
          ...state,
          subscription: 'success',
          subscriptionError: '',
        };
      case 'SUBSCRIBE_FAILURE':
        return {
          ...state,
          subscription: 'failure',
          subscriptionError: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default subscribeReducer;
  