import axios from "axios";

export const fetchClients = (id) => async (dispatch) => {
  try {
    console.log("Fetching clients...");
    const response = await axios.get(`http://localhost:3001/api/v1/clients/fetch?userId=${id}`);
    // const response = await axios.get(`https://kickervideoapi.vercel.app/api/v1/clients/fetch?userId=${id}`);
    const clients = response.data;
    
    console.log("Fetched cleints:", clients); // Log the fetched items
    
    dispatch({
      type: "FETCH_CLIENTS_SUCCESS",
      payload: clients,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    dispatch({
      type: "FETCH_CLIENTS_FAILURE",
      payload: error.message,
    });
  }
};
