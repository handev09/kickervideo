const initialState = {
    contacts: [],
  contact: [],
  loading: false,
  error: null,
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      console.log("Adding a contact...");
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case "FETCH_CONTACTS_SUCCESS":
      console.log("Fetching clients was successful.");
      console.log("Payload:", action.payload);
      return {
        ...state,
        contacts: action.payload,
        loading: false,
        error: null,
      };
      case "FETCH_CONTACT_SUCCESS":
        console.log("Fetching client was successful.");
      console.log("Payload:", action.payload);
      return {
        ...state,
        contact: action.payload,
        loading: false,
        error: null,
      }
    case "FETCH_CONTACTS_FAILURE":
      console.log("Fetching clients failed.");
      console.log("Error:", action.payload);
      return {
        ...state,
        contacts: [],
        loading: false,
        error: action.payload,
      };
      case "FETCH_CONTACT_FAILURE":
      console.log("Fetching client failed.");
      console.log("Error:", action.payload);
      return {
        ...state,
        contact: [],
        loading: false,
        error: action.payload,
      };
    case "DELETE_CONTACT":
      console.log("Deleting an contact...");
      const updatedClients = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      return {
        ...state,
        contacts: updatedClients,
      };
    default:
      return state;
  }
};

export default contactsReducer;
