import { configureStore } from "@reduxjs/toolkit";
import errorsReducer from "src/redux/features/errors/errorsSlice";
import usersReducer from "src/redux/features/users/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    errors: errorsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
