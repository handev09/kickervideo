const initialState = {
  clients: [],
  client: [],
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
    case "FETCH_CLIENT_SUCCESS":
      console.log("Fetching client was successful.");
      console.log("Payload:", action.payload);
      return {
        ...state,
        client: action.payload,
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
    case "FETCH_CLIENT_FAILURE":
      console.log("Fetching client failed.");
      console.log("Error:", action.payload);
      return {
        ...state,
        client: [],
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
    case "UPDATE_CLIENT":
      console.log("Updating a client...");
      // Find the index of the client to update
      const clientIndex = state.clients.findIndex(
        (client) => client.id === action.payload.clientId
      );
      // Create a copy of the updated client
      const updatedClient = {
        ...state.clients[clientIndex],
        ...action.payload.updatedClientData,
      };
      // Create a new clients array with the updated client
      const updatedClientsArray = [...state.clients];
      updatedClientsArray[clientIndex] = updatedClient;
      return {
        ...state,
        clients: updatedClientsArray,
      };

      case "DELETE_CLIENT":
      console.log("Deleting an expense...");
      const updatedClientz = state.clients.filter(
        (client) => client.client_id !== action.payload
      );
      return {
        ...state,
        clients: updatedClientz,
      };

    default:
      return state;
  }
};

export default clientsReducer;
