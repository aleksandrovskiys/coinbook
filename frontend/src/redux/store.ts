import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "src/redux/features/accounts/accountsSlice";
import errorsReducer from "src/redux/features/errors/errorsSlice";
import OperationsReducer from "src/redux/features/operations/operationsSlice";
import usersReducer from "src/redux/features/users/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    errors: errorsReducer,
    accounts: accountsReducer,
    operations: OperationsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
