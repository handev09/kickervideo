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
      case "UPDATE_CREW":
        console.log("Updating a crew member...");
        const { crewId, crewData } = action.payload;
        // Find the index of the item to update
        const crewIndex = state.members.findIndex((crew) => crew.crew_id === crewId);
        if (crewIndex !== -1) {
          // Create a new array with the updated item
          const updatedCrewArray = [...state.members];
          updatedCrewArray[crewIndex] = crewData;
          return {
            ...state,
            members: updatedCrewArray,
          };
        }
        // If item not found, return the current state
        return state;
    default:
      return state;
  }
};

export default crewReducer;
