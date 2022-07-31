import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ApiError } from "src/common/exceptions";

interface ErrorMessage {
  id: string;
  message: string;
  open: boolean;
}

export function parseErrors(err: Error | ApiError, thunkApi) {
  if (err instanceof ApiError) {
    if (err.errors) {
      err.errors.forEach((error: string) => {
        thunkApi.dispatch(addError(error));
      });
      thunkApi.rejectWithValue(err.errors);
    } else {
      thunkApi.dispatch(addError(err.message));
      thunkApi.rejectWithValue(err.message);
    }
  } else {
    thunkApi.dispatch(addError(err.message));
    thunkApi.rejectWithValue(err.message);
  }
  throw err;
}

export const errorsSlice = createSlice({
  name: "errors",
  initialState: [] as ErrorMessage[],
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
