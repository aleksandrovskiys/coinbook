import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "src/api";
import { asyncThunkStatuses } from "src/interfaces/api";
import { Account } from "src/redux/features/accounts/accountsSlice";
import { Category } from "src/redux/features/categories/categoriesSlice";
import { parseErrors } from "src/redux/features/errors/errorsSlice";

export interface Operation {
  id: number;
  date: string;
  account: Account;
  userId: number;
  category: Category | null;
  amount: number;
}

export interface OperationCreate {
  date?: string | null;
  accountId?: number;
  categoryId?: number;
  amount?: number;
}

interface OperationsState {
  operations: Operation[];

  status: asyncThunkStatuses;
  operationCreationStatus: asyncThunkStatuses;
}

const initialState: OperationsState = {
  operations: [],
  status: "idle",

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

export const updateOperation = createAsyncThunk(
  "operations/updateOperation",
  async (operation: Operation, thunkApi) => {
    try {
      const result = await api.updateOperation(operation);
      return result;
    } catch (err) {
      parseErrors(err, thunkApi);
    }
  }
);

export const deleteOperation = createAsyncThunk(
  "operations/deleteOperation",
  async (operation: Operation, thunkApi) => {
    try {
      const result = await api.deleteOperation(operation);
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
    updateOperationsCategory(state, action: PayloadAction<Category>) {
      state.operations = state.operations.map((element) => {
        if (element.category?.id === action.payload.id) {
          element.category = action.payload;
        }
        return element;
      });
    },
    deleteOperationsCategory(state, action: PayloadAction<Category>) {
      state.operations = state.operations.map((element) => {
        if (element.category?.id === action.payload.id) {
          element.category = null;
        }
        return element;
      });
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
        state.operations = state.operations.sort((a, b) => (a.date < b.date ? 1 : -1));
      })
      .addCase(createOperation.rejected, (state, action) => {
        state.operationCreationStatus = "failed";
      })
      .addCase(updateOperation.fulfilled, (state, action) => {
        if (action.payload) {
          const operation = state.operations.find((element) => element.id === action.payload?.id);
          if (operation) {
            for (const key in action.payload) {
              operation[key] = action.payload[key];
            }
          }
        }
      })
      .addCase(deleteOperation.fulfilled, (state, action) => {
        state.operations = state.operations.filter((element) => element.id !== action.payload?.id);
      });
  },
});

export const { updateOperationsCategory, deleteOperationsCategory } = operationsSlice.actions;

export default operationsSlice.reducer;
