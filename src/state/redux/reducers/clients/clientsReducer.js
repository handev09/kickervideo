const initialState = {
    clients: [],
    loading: false,
    error: null,
  };
  
  const clientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_CLIENT":
        console.log("Adding a client...");
        return {
          ...state,
          expenses: [...state.clients, action.payload],
        };
      case "FETCH_CLIENTS_SUCCESS":
        console.log("Fetching clients was successful.");
        console.log("Payload:", action.payload);
        return {
          ...state,
          clients: action.payload,
          loading: false,
          error: null,
        };
      case "FETCH_CLIENTS_FAILURE":
        console.log("Fetching clients failed.");
        console.log("Error:", action.payload);
        return {
          ...state,
          clients: [],
          loading: false,
          error: action.payload,
        };
      case "DELETE_CLIENT":
        console.log("Deleting an client...");
        const updatedClients = state.clients.filter(
          (client) => client.id !== action.payload
        );
        return {
          ...state,
          clients: updatedClients,
        };
      default:
        return state;
    }
  };
  
  export default clientsReducer;
  