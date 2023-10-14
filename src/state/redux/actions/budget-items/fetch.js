import axios from "axios";

export const fetchItems = (id) => async (dispatch) => {
  try {
    console.log("Fetching items...");
    // const response = await axios.get(`http://localhost:3001/api/v1/items/fetch?userId=${id}`);
    const response = await axios.get(`https://kickervideoapi.vercel.app/api/v1/items/fetch?userId=${id}`);
    const items = response.data;
    
    console.log("Fetched items:", items); // Log the fetched items
    
    dispatch({
      type: "FETCH_ITEM_SUCCESS", 
      payload: items,
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    dispatch({
      type: "FETCH_ITEM_FAILURE",
      payload: error.message,
    });
  }
};
