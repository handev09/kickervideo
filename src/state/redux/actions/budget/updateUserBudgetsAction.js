// updateUserBudgetsAction.js
import axios from "axios";

export const fetchUserBudgets = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/v1/budget/fetch?userId=${userId}`);
    // const response = await axios.get(`https://kickervideoapi.vercel.app/api/v1/budget/fetch?userId=${userId}`);
    const budgets = response.data;
    dispatch({
      type: "FETCH_USER_BUDGETS_SUCCESS",
      payload: budgets,
    });
  } catch (error) {
    console.error("Error fetching user budgets:", error);
    dispatch({
      type: "FETCH_USER_BUDGETS_FAILURE",
      payload: error.message,
    });
  }
};
