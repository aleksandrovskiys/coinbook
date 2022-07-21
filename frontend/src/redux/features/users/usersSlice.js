import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  id: null,
  name: null,

  registrationSuccessfull: null,
  registrationErrors: [],
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

    startRegistration: (state) => {
      state.registrationErrors = [];
      state.registrationSuccessfull = null;
    },

    registrationFinished: (state) => {
      state.registrationSuccessfull = true;
    },

    setRegistrationError: (state, action) => {
      action.payload.split("∆").forEach((element) => state.registrationErrors.push(element));
      state.registrationSuccessfull = false;
    },
  },
});

export const { logout, login, startRegistration, registrationFinished, setRegistrationError } =
  usersSlice.actions;

export const selectLoggedIn = (state) => state.users.isLoggedIn;

export default usersSlice.reducer;
