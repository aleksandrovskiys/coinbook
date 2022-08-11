import { Container, CssBaseline } from "@mui/material";
import * as React from "react";
import { User } from "src/redux/features/users/usersSlice";
import { useAppSelector } from "src/redux/hooks";

export default function Profile() {
  const currentUser: User | null = useAppSelector((state) => state.users.userInfo);

  if (currentUser == null) return <h1>Loading...</h1>;

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <h1>Profile page</h1>
      <h3>ID: {currentUser.id}</h3>
      <h3>First name: {currentUser.first_name}</h3>
      <h3>Last name: {currentUser.last_name}</h3>
      <h3>E-Mail: {currentUser.email}</h3>
      <h3>Active: {String(currentUser.is_active)}</h3>
      <h3>Superuser: {String(currentUser.is_superuser)}</h3>
    </Container>
  );
}
