import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "src/api";
import { asyncThunkStatuses } from "src/interfaces/api";
import { parseErrors } from "src/redux/features/errors/errorsSlice";
import {
  deleteOperationsCategory,
  OperationType,
  updateOperationsCategory,
} from "src/redux/features/operations/operationsSlice";
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
  newCategory: { [key in CategoryType]: CategoryCreate };

  loadStatus: asyncThunkStatuses;
  categoryCreationStatus: { [key in CategoryType]: asyncThunkStatuses };
  categoryUpdateStatus: { [key: number]: asyncThunkStatuses };
}

const initialState: CategoriesState = {
  categories: [],
  newCategory: {
    expense: {
      name: "",
      type: "expense",
    },
    income: {
      name: "",
      type: "income",
    },
  },

  loadStatus: "idle",
  categoryCreationStatus: { expense: "idle", income: "idle" },
  categoryUpdateStatus: {},
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
  async (payload: { type: CategoryType; value: CategoryCreate }, thunkApi) => {
    try {
      const result = await api.createCategory(payload.value);
      return { type: payload.type, result: result };
    } catch (err) {
      parseErrors(err, thunkApi);
      thunkApi.dispatch(clearNewCategory(payload.type));
    }
  }
);

export const updateCategory = createAsyncThunk("categories/updateCategory", async (payload: Category, thunkApi) => {
  try {
    const result = await api.updateCategory(payload);
    thunkApi.dispatch(updateOperationsCategory(result));
    return result;
  } catch (err) {
    thunkApi.dispatch(setCategoryStatusFailed(payload));
    parseErrors(err, thunkApi);
    return payload;
  }
});

export const deleteCategory = createAsyncThunk("categories/deleteCategory", async (payload: Category, thunkApi) => {
  try {
    const result = await api.deleteCategory(payload);
    thunkApi.dispatch(deleteOperationsCategory(result));
    return result;
  } catch (err) {
    parseErrors(err, thunkApi);
    return payload;
  }
});

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    clearNewCategory(state, action: PayloadAction<CategoryType>) {
      state.newCategory[action.payload] = initialState.newCategory[action.payload];
      state.categoryCreationStatus[action.payload] = "idle";
    },
    setNewCategoryName(state, action: PayloadAction<{ type: CategoryType; value: string }>) {
      state.newCategory[action.payload.type].name = action.payload.value;
    },
    resetUpdateCategoryStatus(state, action: PayloadAction<Category>) {
      state.categoryUpdateStatus[action.payload.id] = "idle";
    },
    setCategoryStatusFailed(state, action: PayloadAction<Category>) {
      state.categoryUpdateStatus[action.payload.id] = "failed";
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
        if (action.payload) state.categories.push(action.payload.result);
        state.categoryCreationStatus[action.payload!.type] = "succeeded";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const category = state.categories.find((element) => element.id === action.payload.id);
        category!.name = action.payload.name;
        state.categoryUpdateStatus[category!.id] = "succeeded";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((element) => element.id !== action.payload.id);
      });
  },
});

export const categoriesSelectorCreator = (type: OperationType) => (state: RootState) =>
  state.categories.categories.filter((element) => element.type === type);

export const { setNewCategoryName, clearNewCategory, resetUpdateCategoryStatus, setCategoryStatusFailed } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
