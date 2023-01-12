import { Container } from "@mui/material";
import * as React from "react";
import ReportsContainer from "src/components/pages/ReportsPage/ReportsContainer";
import { useUser } from "src/redux/features/users/hooks";

const ReportsPage = () => {
  const currentUser = useUser();

  return (
    <Container component="main" maxWidth="lg">
      {!!currentUser ? <ReportsContainer /> : null}
    </Container>
  );
};

export default ReportsPage;
