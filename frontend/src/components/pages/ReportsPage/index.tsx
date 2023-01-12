import { Container } from "@mui/material";
import * as React from "react";
import ReportsContainer from "src/components/pages/ReportsPage/ReportsContainer";
import { User } from "src/redux/features/users/usersSlice";
import { useAppSelector } from "src/redux/hooks";

const ReportsPage = () => {
  const currentUser: User | null = useAppSelector((state) => state.users.userInfo);

  return (
    <Container component="main" maxWidth="lg">
      {!!currentUser ? <ReportsContainer /> : null}
    </Container>
  );
};

export default ReportsPage;
