import axios from "axios";

export const fetchContact = (id) => async (dispatch) => {
  try {
    console.log("Fetching client...");
    const response = await axios.get(`http://localhost:3001/api/v1/clients/contact-details?contactId=${id}`);
    // const response = await axios.get(`https://kickervideoapi.vercel.app/api/v1/clients/client-details?clientId=${id}`);
    const contact = response.data;
    
    console.log("Fetched contact:", contact); // Log the fetched items
    
    dispatch({
      type: "FETCH_CONTACT_SUCCESS",
      payload: client,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    dispatch({
      type: "FETCH_CONTACT_FAILURE",
      payload: error.message,
    });
  }
};
