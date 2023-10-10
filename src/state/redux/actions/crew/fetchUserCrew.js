// updateUserBudgetsAction.js
import axios from "axios";

export const fetchUserCrew = (userId) => async (dispatch) => {
  try {
    // const response = await axios.get(`http://localhost:3001/api/v1/crew/fetch?userId=${userId}`);
    const response = await axios.get(`https://kickervideoapi.vercel.app/api/v1/crew/fetch?userId=${userId}`);
    const members = response.data;
    dispatch({
      type: "FETCH_USER_CREW_SUCCESS",
      payload: members,
    });
  } catch (error) {
    console.error("Error fetching user budgets:", error);
    dispatch({
      type: "FETCH_USER_CREW_FAILURE",
      payload: error.message,
    });
  }
};
