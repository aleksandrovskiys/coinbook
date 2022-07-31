import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/api";
import { asyncThunkStatuses } from "src/interfaces/api";
import { addError } from "src/redux/features/errors/errorsSlice";
import { getTokenFromStorage } from "src/utils/localStorage";

const userToken = getTokenFromStorage();

export const fetchUserInformation = createAsyncThunk(
  "users/fetchUserInformation",
  async (arg: void, thunkApi) => {
    try {
      const result = await api.getUserInfo();
      return await result.json();
    } catch (err) {
      if (err.errors) {
        err.errors.forEach((error: string) => {
          thunkApi.dispatch(addError(error));
        });
      }
      thunkApi.rejectWithValue(err.errors);
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
      if (err.errors) {
        err.errors.forEach((error: string) => {
          thunkApi.dispatch(addError(error));
        });
      }
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
      if (err.errors) {
        err.errors.forEach((error: string) => {
          thunkApi.dispatch(addError(error));
        });
        throw Error("Error on registration");
      }
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

    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserInformation.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(startLogin.rejected, (state, action) => {
        state.loginStatus = "failed";
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

export const { logout, login, updateUserInfo } = usersSlice.actions;

export default usersSlice.reducer;
