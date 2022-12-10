import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "src/redux/features/accounts/accountsSlice";
import categoriesReducer from "src/redux/features/categories/categoriesSlice";
import errorsReducer from "src/redux/features/errors/errorsSlice";
import operationsReducer from "src/redux/features/operations/operationsSlice";
import netWorthReportReducer from "src/redux/features/reports/netWorthReportSlice";
import usersReducer from "src/redux/features/users/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    errors: errorsReducer,
    accounts: accountsReducer,
    operations: operationsReducer,
    categories: categoriesReducer,
    netWorthReport: netWorthReportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
