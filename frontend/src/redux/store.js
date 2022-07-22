import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "src/redux/features/users/usersSlice";
import errorsReducer from "src/redux/features/errors/errorsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    errors: errorsReducer,
  },
});
