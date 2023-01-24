import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { APPLICATION_URLS } from "src/common/constants";
import { startLogin } from "src/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { LoginForm, LoginFormData } from "./LoginForm";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginStatus = useAppSelector((state) => state.users.loginStatus);

  if (loginStatus === "succeeded") {
    navigate(APPLICATION_URLS.home);
    return null;
  }

  const onSubmit = async (data: LoginFormData) => {
    const { email: username, password } = data;
    dispatch(startLogin({ username, password }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginForm onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}
