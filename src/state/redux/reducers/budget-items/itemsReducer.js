const initialState = {
  items: [],
  loading: false,
  error: null,
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      console.log("Adding an item...");
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "FETCH_ITEM_SUCCESS":
      console.log("Fetching items was successful.");
      console.log("Payload:", action.payload);
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_ITEM_FAILURE":
      console.log("Fetching items failed.");
      console.log("Error:", action.payload);
      return {
        ...state,
        items: [],
        loading: false,
        error: action.payload,
      };
    case "DELETE_ITEM":
      console.log("Deleting an items...");
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        items: updatedItems,
      };
    default:
      return state;
  }
};

export default itemsReducer;
