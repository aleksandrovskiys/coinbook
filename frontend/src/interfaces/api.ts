import { User } from "src/redux/features/users/usersSlice"

export interface LoginInterface {
    token: string,
    user_info: User
}