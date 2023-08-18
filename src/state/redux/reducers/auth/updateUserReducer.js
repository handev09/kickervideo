import { createReducer } from "@reduxjs/toolkit";
import { updateUser } from "../actions/userActions";

const initialState = {
  id: null,
  name: "",
  email: "",
  // other user properties
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateUser, (state, action) => {
    return { ...state, ...action.payload };
  });
});

export default userReducer;
