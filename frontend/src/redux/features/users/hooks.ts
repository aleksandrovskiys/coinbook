import { User } from "src/redux/features/users/usersSlice";
import { useAppSelector } from "src/redux/hooks";

export const useUser = (): User | null => {
  const user = useAppSelector((state) => state.users.userInfo);
  return user;
};
