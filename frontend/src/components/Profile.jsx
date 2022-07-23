import { Container, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

export default function Profile() {
  const currentUser = useSelector((state) => state.users.userInfo) || {};

  return (
    <Container component="main" maxWidth="xs">
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
