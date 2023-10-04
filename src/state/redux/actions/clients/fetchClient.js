import axios from "axios";

export const fetchClients = (id) => async (dispatch) => {
  try {
    console.log("Fetching client...");
    const response = await axios.get(`http://localhost:3001/api/v1/clients/client-details?clientId=${id}`);
    // const response = await axios.get(`https://kickervideoapi.vercel.app/api/v1/clients/client-details?clientId=${id}`);
    const client = response.data;
    
    console.log("Fetched clints:", client); // Log the fetched items
    
    dispatch({
      type: "FETCH_CLIENT_SUCCESS",
      payload: client,
    });
  } catch (error) {
    console.error("Error fetching client:", error);
    dispatch({
      type: "FETCH_CLIENT_FAILURE",
      payload: error.message,
    });
  }
};
