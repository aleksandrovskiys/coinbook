import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface ErrorMessage {
  id: string,
  message: string,
  open: boolean
}


export const errorsSlice = createSlice({
  name: "errors",
  initialState: [] as Array<ErrorMessage>,
  reducers: {
    addError: (state, errorAction: PayloadAction<string>) => {
      const error: ErrorMessage = {
        id: nanoid(),
        message: errorAction.payload,
        open: true,
      };
      state.push(error);
    },
    removeError: (state, action: PayloadAction<string>) => {
      return state.filter((element) => element.id !== action.payload);
    },
    clearErrors: (state) => {
      return [];
    },
  },
});

export const { addError, removeError, clearErrors } = errorsSlice.actions;

export default errorsSlice.reducer;