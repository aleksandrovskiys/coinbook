import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface ErrorMessage {
  id: string;
  message: string;
  open: boolean;
}

export const errorsSlice = createSlice({
  name: "errors",
  initialState: [] as Array<ErrorMessage>,
  reducers: {
    addError: {
      reducer: (state, errorAction: PayloadAction<ErrorMessage>) => {
        state.push(errorAction.payload);
      },
      prepare: (message: string) => {
        const error: ErrorMessage = {
          id: nanoid(),
          message: message,
          open: true,
        };

        return { payload: error };
      },
    },
    removeError: (state, action: PayloadAction<string>) => {
      return state.filter((element) => element.id !== action.payload);
    },
    clearErrors: () => {
      return [];
    },
  },
});

export const { addError, removeError, clearErrors } = errorsSlice.actions;

export default errorsSlice.reducer;
