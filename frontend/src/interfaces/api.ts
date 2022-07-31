import { User } from "src/redux/features/users/usersSlice";

export interface LoginInterface {
  access_token: string;
  token_type: string;
  user_info: User;
}

export type asyncThunkStatuses = "idle" | "pending" | "succeeded" | "failed";
