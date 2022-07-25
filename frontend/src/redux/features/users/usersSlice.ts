import { createSlice } from "@reduxjs/toolkit";
import { getTokenFromStorage } from "src/utils/localStorage";

const userToken = getTokenFromStorage();

export interface User {
  id: number,

  first_name: string | null,
  last_name: string | null,
  email: string,

  is_active: boolean | null,
  is_superuser: boolean
}

interface UsersState {
  userToken: string | null,
  userInfo: User | null,

  registrationSuccessfull: boolean | null,
}

const initialState: UsersState = {
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
      state.userInfo = action.payload["user_info"];
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
