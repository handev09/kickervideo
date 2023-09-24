import axios from "axios";

export const fetchExpense = (id) => async (dispatch) => {
  try {
    console.log("Fetching expenses...");
    const response = await axios.get(`http://localhost:3001/api/v1/expense/fetch?userId=${id}`);
    // const response = await axios.get(`https://kickervideoapi.vercel.app/api/v1/expense/fetch?userId=${id}`);
    const expenses = response.data;
    
    console.log("Fetched expenses:", expenses); // Log the fetched expenses
    
    dispatch({
      type: "FETCH_EXPENSE_SUCCESS",
      payload: expenses,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    dispatch({
      type: "FETCH_EXPENSE_FAILURE",
      payload: error.message,
    });
  }
};
