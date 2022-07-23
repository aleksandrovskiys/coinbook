import { createSlice } from "@reduxjs/toolkit";
import { getTokenFromStorage } from "src/utils/localStorage";

const userToken = getTokenFromStorage();

const initialState = {
  userToken,
  userInfo: null,

  registrationSuccessfull: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.userToken = null;
      state.userInfo = null;
    },

    login: (state, action) => {
      localStorage.setItem("userToken", action.payload.token);
      state.userToken = action.payload.token;
      state.userInfo = action.payload["user-info"];
    },

    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    startRegistration: (state) => {
      state.registrationSuccessfull = null;
    },

    registrationFinished: (state) => {
      state.registrationSuccessfull = true;
    },

    setRegistrationFailed: (state) => {
      state.registrationSuccessfull = false;
    },
  },
});

export const userInfoSelector = (state) => {
  if (!state.users.userInfo) {
  }
};

export const {
  logout,
  login,
  updateUserInfo,
  startRegistration,
  registrationFinished,
  setRegistrationFailed,
} = usersSlice.actions;

export default usersSlice.reducer;
