// budgetReducer.js
const initialState = {
    members: [],
  };
  
  const crewReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_USER':
        return {
          ...state,
          members: [...state.members, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default crewReducer;
  