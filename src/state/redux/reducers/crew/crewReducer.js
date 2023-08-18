// budgetReducer.js
const initialState = {
  members: [],
  loading: false,
  error: null,
};

const crewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        members: [...state.members, action.payload],
      };
    case "FETCH_USER_CREW_SUCCESS":
      return {
        ...state,
        members: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_USER_CREW_FAILURE":
      return {
        ...state,
        members: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default crewReducer;
