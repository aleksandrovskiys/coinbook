import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/api";
import { asyncThunkStatuses } from "src/interfaces/api";
import { parseErrors } from "src/redux/features/errors/errorsSlice";
import { OperationType } from "src/redux/features/operations/operationsSlice";
import { RootState } from "src/redux/store";

export type CategoryType = "expense" | "income";

export interface Category {
  id: number;
  name: string;
  type: CategoryType;

  monthExpenses?: number;
}

interface CategoriesState {
  categories: Category[];

  loadStatus: asyncThunkStatuses;
}

const initialState: CategoriesState = {
  categories: [],

  loadStatus: "idle",
};

export const fetchUserCategories = createAsyncThunk(
  "categories/fetchUserCategories",
  async (arg: void, thunkApi): Promise<Category[]> => {
    try {
      const result = await api.getCategories();
      return result;
    } catch (error) {
      parseErrors(error, thunkApi);
      return [] as Category[];
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserCategories.pending, (state) => {
        state.loadStatus = "pending";
      })
      .addCase(fetchUserCategories.rejected, (state) => {
        state.loadStatus = "failed";
        state.categories = [];
      })
      .addCase(fetchUserCategories.fulfilled, (state, action) => {
        state.loadStatus = "succeeded";
        state.categories = action.payload;
      });
  },
});

export const categoriesSelectorCreator = (type: OperationType) => (state: RootState) =>
  state.categories.categories.filter((element) => element.type === type);

export default categoriesSlice.reducer;
