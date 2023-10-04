import axios from "axios";

export const fetchContacts = (id) => async (dispatch) => {
  try {
    console.log("Fetching contacts...");
    const response = await axios.get(`http://localhost:3001/api/v1/contacts/fetch?companyId=${id}`);
    // const response = await axios.get(`https://kickervideoapi.vercel.app/api/v1/expense/fetch?userId=${id}`);
    const contacts = response.data;
    
    console.log("Fetched contacts:", contacts); // Log the fetched contacts
    
    dispatch({
      type: "FETCH_CONTACTS_SUCCESS",
      payload: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    dispatch({
      type: "FETCH_CONTACTS_FAILURE",
      payload: error.message,
    });
  }
};
