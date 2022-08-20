import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/api";
import { asyncThunkStatuses } from "src/interfaces/api";
import { Account } from "src/redux/features/accounts/accountsSlice";
import { Category } from "src/redux/features/categories/categoriesSlice";
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

export interface OperationCreate {
  date?: string;
  accountId?: number;
  type?: OperationType;
  categoryId?: number;
  amount?: number;
}

interface OperationsState {
  operations: Operation[];
  newOperation: OperationCreate;

  status: asyncThunkStatuses;
  operationCreationStatus: asyncThunkStatuses;
}

const initialState: OperationsState = {
  operations: [],
  status: "idle",

  newOperation: {
    date: new Date().toISOString(),
    amount: 0,
  },
  operationCreationStatus: "idle",
};

export const fetchOperations = createAsyncThunk("operations/fetchOperations", async (arg: void, thunkApi) => {
  try {
    const result = await api.getOperations();
    return result;
  } catch (err) {
    parseErrors(err, thunkApi);
  }
});

export const createOperation = createAsyncThunk(
  "operations/createOperation",
  async (operation: OperationCreate, thunkApi) => {
    try {
      const result = await api.createOperation(operation);
      return result;
    } catch (err) {
      parseErrors(err, thunkApi);
    }
  }
);

export const operationsSlice = createSlice({
  name: "operations",
  initialState: initialState,
  reducers: {
    clearNewOperation(state) {
      state.newOperation = initialState.newOperation;
      state.operationCreationStatus = "idle";
    },
    startOperationCreation(state, action) {
      state.newOperation = {
        ...initialState.newOperation,
        type: action.payload,
      };
    },
    setNewOperationAmount(state, action) {
      state.newOperation!.amount = action.payload;
    },
    setNewOperationAccountId(state, action) {
      state.newOperation.accountId = action.payload;
    },
    setNewOperationDate(state, action) {
      state.newOperation.date = action.payload;
    },
    setNewOperationCategoryId(state, action) {
      state.newOperation.categoryId = action.payload;
    },
  },
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
        state.operations = action.payload || [];
      })
      .addCase(createOperation.fulfilled, (state, action) => {
        if (action.payload) state.operations.unshift(action.payload);
        state.operationCreationStatus = "succeeded";
      })
      .addCase(createOperation.rejected, (state, action) => {
        state.operationCreationStatus = "failed";
      });
  },
});

export const {
  clearNewOperation,
  startOperationCreation,
  setNewOperationAmount,
  setNewOperationAccountId,
  setNewOperationDate,
  setNewOperationCategoryId,
} = operationsSlice.actions;

export default operationsSlice.reducer;
