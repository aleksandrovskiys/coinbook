import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/api";
import { asyncThunkStatuses } from "src/interfaces/api";
import { parseErrors } from "src/redux/features/errors/errorsSlice";

export interface Currency {
  name: string;
  code: string;
  symbol?: string;
}

export interface Account {
  id: number;
  name: string;
  userId: number;
  currency: Currency;

  balance: number;
  monthWorthChange: number;
}

interface AccountState {
  accounts?: Account[];

  status: asyncThunkStatuses;
}

const initialState: AccountState = {
  accounts: [],

  status: "idle",
};

export const fetchAccountsInformation = createAsyncThunk(
  "accounts/fetchAccountsInformation",
  async (arg: void, thunkApi) => {
    try {
      const result = await api.getAccountsInfo();
      return result;
    } catch (err) {
      parseErrors(err, thunkApi);
    }
  }
);

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAccountsInformation.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAccountsInformation.fulfilled, (state, action) => {
        state.accounts = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAccountsInformation.rejected, (state) => {
        state.accounts = [];
        state.status = "failed";
      });
  },
});

export default accountsSlice.reducer;
