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
      console.log("Deleting an item...");
      const updatedItems = state.items.filter(
        (item) => item.item_id !== action.payload
      );
      return {
        ...state,
        items: updatedItems,
      };
    case "UPDATE_ITEM":
      console.log("Updating an item...");
      const { itemId, itemData } = action.payload;
      // Find the index of the item to update
      const itemIndex = state.items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        // Create a new array with the updated item
        const updatedItemsArray = [...state.items];
        updatedItemsArray[itemIndex] = itemData;
        return {
          ...state,
          items: updatedItemsArray,
        };
      }
      // If item not found, return the current state
      return state;
    default:
      return state;
  }
};

export default itemsReducer;
