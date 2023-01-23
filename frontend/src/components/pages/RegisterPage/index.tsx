import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { APPLICATION_URLS } from "src/common/constants";
import RegistrationForm, { RegistrationFormValues } from "src/components/pages/RegisterPage/RegistrationForm";
import { clearErrors } from "src/redux/features/errors/errorsSlice";
import { startRegistration } from "src/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { SuccessfullRegistration } from "./SuccessfullRegistration";

const theme = createTheme();

export const RegisterPage = () => {
  const registrationStatus = useAppSelector((state) => state.users.registrationStatus);
  const loginStatus = useAppSelector((state) => state.users.loginStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (loginStatus === "succeeded") {
    navigate(APPLICATION_URLS.home, { replace: true });
    return null;
  }

  const onSubmit = (data: RegistrationFormValues) => {
    dispatch(startRegistration(data));
    dispatch(clearErrors());
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {registrationStatus === "succeeded" ? (
          <SuccessfullRegistration />
        ) : (
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
              Sign up
            </Typography>
            <RegistrationForm onSubmit={onSubmit} />
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default RegisterPage;
