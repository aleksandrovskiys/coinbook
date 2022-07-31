import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/api";
import { asyncThunkStatuses } from "src/interfaces/api";
import { parseErrors } from "src/redux/features/errors/errorsSlice";
import { getTokenFromStorage } from "src/utils/localStorage";

const userToken = getTokenFromStorage();

export const fetchUserInformation = createAsyncThunk(
  "users/fetchUserInformation",
  async (arg: void, thunkApi) => {
    try {
      const result = await api.getUserInfo();
      return await result.json();
    } catch (err) {
      parseErrors(err, thunkApi);
    }
  }
);

export const startLogin = createAsyncThunk(
  "users/login",
  async (arg: { username: string; password: string }, thunkApi) => {
    try {
      const result = await api.login(arg.username, arg.password);
      const data = await result.json();
      thunkApi.dispatch(login(data));
    } catch (err) {
      parseErrors(err, thunkApi);
    }
  }
);

export const startRegistration = createAsyncThunk(
  "users/register",
  async (
    arg: { firstName: string; lastName: string; email: string; password: string },
    thunkApi
  ) => {
    try {
      const result = await api.register(arg.firstName, arg.lastName, arg.email, arg.password);
      const data = await result.json();
      return data;
    } catch (err) {
      parseErrors(err, thunkApi);
    }
  }
);

export interface User {
  id: number;

  first_name: string | null;
  last_name: string | null;
  email: string;

  is_active: boolean | null;
  is_superuser: boolean;
}

interface UsersState {
  userToken: string | null;
  userInfo: User | null;

  loginStatus: asyncThunkStatuses;
  registrationStatus: asyncThunkStatuses;
}

const initialState: UsersState = {
  userToken,
  userInfo: null,

  loginStatus: "idle",
  registrationStatus: "idle",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.userToken = null;
      state.userInfo = null;
      state.loginStatus = "idle";
    },

    login: (state, action) => {
      localStorage.setItem("userToken", action.payload.access_token);
      state.userToken = action.payload.access_token;
      state.userInfo = action.payload["user_info"];
      state.loginStatus = "succeeded";
    },
    setRegistrationStatusIdle: (state) => {
      state.registrationStatus = "idle";
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserInformation.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loginStatus = "succeeded";
      })
      .addCase(fetchUserInformation.rejected, (state) => {
        state.loginStatus = "failed";
      })
      .addCase(startLogin.pending, (state) => {
        state.loginStatus = "pending";
      })
      .addCase(startLogin.rejected, (state) => {
        state.loginStatus = "failed";
      })
      .addCase(startRegistration.pending, (state) => {
        state.registrationStatus = "pending";
      })
      .addCase(startRegistration.fulfilled, (state) => {
        state.registrationStatus = "succeeded";
      })
      .addCase(startRegistration.rejected, (state) => {
        state.registrationStatus = "failed";
      });
  },
});

export const userInfoSelector = (state) => {
  if (!state.users.userInfo) {
  }
};

export const { logout, login, setRegistrationStatusIdle, updateUserInfo } = usersSlice.actions;

export default usersSlice.reducer;
