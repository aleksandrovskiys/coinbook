import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/api";
import { asyncThunkStatuses } from "src/interfaces/api";
import { ExpensesReportResponse } from "src/interfaces/reports";
import { parseErrors } from "src/redux/features/errors/errorsSlice";

export interface ExpensesReportParameters {
  startDate: Date;
  endDate: Date;
  periodType: string;
}

interface ExpensesReportState {
  data: ExpensesReportResponse[];
  status: asyncThunkStatuses;
}

const initialState: ExpensesReportState = {
  data: [],
  status: "idle",
};

export const fetchExpensesData = createAsyncThunk(
  "expensesReport/fetchData",
  async (parameters: ExpensesReportParameters, thunkApi) => {
    try {
      const result = await api.getExpensesData(parameters);
      return result;
    } catch (err) {
      parseErrors(err, thunkApi);
    }
  }
);

export const expensesReportSlice = createSlice({
  name: "expensesReport",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchExpensesData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchExpensesData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchExpensesData.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.data = action.payload;
        } else {
          state.data = [];
        }
      });
  },
});

export default expensesReportSlice.reducer;
