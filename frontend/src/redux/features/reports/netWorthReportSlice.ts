import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/api";
import { asyncThunkStatuses } from "src/interfaces/api";
import { NetWorthPeriodType } from "src/interfaces/reports";
import { parseErrors } from "src/redux/features/errors/errorsSlice";

interface NetWorthReportDataPoint {
  period: Date;
  amount: number;
}

interface NetWorthReportState {
  data: NetWorthReportDataPoint[];
  status: asyncThunkStatuses;
}

export interface NetWorthReportParameters {
  startDate: Date;
  endDate: Date;
  periodType: NetWorthPeriodType;
}

const initialState: NetWorthReportState = {
  data: [],
  status: "idle",
};

export const fetchNetWorthData = createAsyncThunk(
  "netWorthReport/fetchData",
  async (parameters: NetWorthReportParameters, thunkApi) => {
    try {
      const result = await api.getNetWorthData(parameters);
      return result;
    } catch (err) {
      parseErrors(err, thunkApi);
    }
  }
);

export const netWorthReportSlice = createSlice({
  name: "netWorthReport",
  initialState: initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchNetWorthData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchNetWorthData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchNetWorthData.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.data = action.payload.data.map((el) => ({ ...el, period: new Date(el.period) }));
        } else {
          state.data = [];
        }
      });
  },
});

export default netWorthReportSlice.reducer;
