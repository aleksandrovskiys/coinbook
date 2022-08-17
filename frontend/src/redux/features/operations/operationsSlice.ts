import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/api";
import { asyncThunkStatuses } from "src/interfaces/api";
import { Account } from "src/redux/features/accounts/accountsSlice";
import { Category } from "src/redux/features/categories/categories";
import { parseErrors } from "src/redux/features/errors/errorsSlice";

export type OperationType = "expense" | "income" | "balance_correction";

export interface Operation {
  id: number;
  date: string;
  account: Account;
  userId: number;
  type: OperationType;
  category: Category;
  amount: number;
}

interface OperationsState {
  operations?: Operation[];

  status: asyncThunkStatuses;
}

const initialState: OperationsState = {
  operations: [],
  status: "idle",
};

export const fetchOperations = createAsyncThunk("operations/fetchOperations", async (arg: void, thunkApi) => {
  try {
    const result = await api.getOperations();
    return result;
  } catch (err) {
    parseErrors(err, thunkApi);
  }
});

export const operationsSlice = createSlice({
  name: "operations",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOperations.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchOperations.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchOperations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.operations = action.payload;
      });
  },
});

export default operationsSlice.reducer;
