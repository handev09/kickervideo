/** @format */

import axios from "axios";

// Action type constants
export const UPDATE_BUDGET_REQUEST = "UPDATE_BUDGET_REQUEST";
export const UPDATE_BUDGET_SUCCESS = "UPDATE_BUDGET_SUCCESS";
export const UPDATE_BUDGET_FAILURE = "UPDATE_BUDGET_FAILURE";

// Action creators
export const updateBudgetRequest = () => ({
    type: UPDATE_BUDGET_REQUEST,
});

export const updateBudgetSuccess = (updatedBudget) => ({
    type: UPDATE_BUDGET_SUCCESS,
    payload: updatedBudget,
});

export const updateBudgetFailure = (error) => ({
    type: UPDATE_BUDGET_FAILURE,
    payload: error,
});

// Thunk action for updating a budget
export const updateBudget = (budgetId, budget) => {
    return async (dispatch) => {
        dispatch(updateBudgetRequest());

        try {
            // Make a PUT request to update the budget
            const response = await axios.put(
                // `http://localhost:3001/api/v1/budget/update/${budgetId}`,
                `https://kickervideoapi.vercel.app/api/v1/budget/update/${budgetId}`,
                budget
            );

            const updatedBudget = response.data;

            dispatch(updateBudgetSuccess(updatedBudget));
        } catch (error) {
            // Handle error here, e.g. dispatch an action to update error state
            console.error("Error updating budget:", error);
            dispatch(updateBudgetFailure("Error updating budget"));
        }
    };
};
