import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid_v4 } from "uuid";

export const errorsSlice = createSlice({
  name: "errors",
  initialState: [],
  reducers: {
    addError: (state, errorAction) => {
      const error = {
        id: uuid_v4(),
        message: errorAction.payload,
        open: true,
      };
      state.push(error);
    },
    removeError: (state, action) => {
      return state.filter((element) => element.id !== action.payload);
    },
    clearErrors: (state) => {
      return [];
    },
  },
});

export const { addError, removeError, clearErrors } = errorsSlice.actions;

export default errorsSlice.reducer;
