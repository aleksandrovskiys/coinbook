import { useEffect } from "react";
import { fetchUserInformation, User } from "src/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

export const useUser = (): User | null => {
  const user = useAppSelector((state) => state.users.userInfo);
  const userToken = useAppSelector((state) => state.users.userToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user && userToken) {
      dispatch(fetchUserInformation());
    }
  }, [dispatch, user, userToken]);

  return user;
};
