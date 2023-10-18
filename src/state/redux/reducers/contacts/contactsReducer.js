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
        (contact) => contact.contact_id !== action.payload
      );
      return {
        ...state,
        contacts: updatedClients,
      };
      case "UPDATE_CONTACT":
        console.log("Updating a contact...");
        const { contactId, contactData } = action.payload;
        // Find the index of the item to update
        const contactIndex = state.contacts.findIndex((contact) => contact.contact_id === contactId);
        if (contactIndex !== -1) {
          // Create a new array with the updated item
          const updatedContactArray = [...state.contacts];
          updatedContactArray[contactIndex] = contactData;
          return {
            ...state,
            contacts: updatedContactArray,
          };
        }
        // If item not found, return the current state
        return state;
    default:
      return state;
  }
};

export default contactsReducer;
