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

export interface CategoryCreate {
  name: string;
  type: CategoryType;
}

interface CategoriesState {
  categories: Category[];
  newCategory: CategoryCreate;

  loadStatus: asyncThunkStatuses;
  categoryCreationStatus: asyncThunkStatuses;
}

const initialState: CategoriesState = {
  categories: [],
  newCategory: {
    name: "",
    type: "expense",
  },

  loadStatus: "idle",
  categoryCreationStatus: "idle",
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

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (category: CategoryCreate, thunkApi) => {
    try {
      const result = await api.createCategory(category);
      return result;
    } catch (err) {
      parseErrors(err, thunkApi);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    clearNewCategory(state) {
      state.newCategory = initialState.newCategory;
      state.categoryCreationStatus = "idle";
    },
    setNewCategoryName(state, action) {
      state.newCategory.name = action.payload;
    },
  },
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
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        if (action.payload) state.categories.push(action.payload);
        state.categoryCreationStatus = "succeeded";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.categoryCreationStatus = "failed";
      });
  },
});

export const categoriesSelectorCreator = (type: OperationType) => (state: RootState) =>
  state.categories.categories.filter((element) => element.type === type);

export const { setNewCategoryName, clearNewCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
