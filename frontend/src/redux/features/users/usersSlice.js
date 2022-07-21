import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  id: null,
  name: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.id = null;
      state.name = null;
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { logout, login } = usersSlice.actions;

export const selectLoggedIn = (state) => state.users.isLoggedIn;
export const selectUserId = (state) => state.users.id;
export const selectUseName = (state) => state.users.name;

export default usersSlice.reducer;
