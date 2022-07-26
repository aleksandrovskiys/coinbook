import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { api } from "src/api";
import { APPLICATION_URLS } from "src/components/common/constants";
import { clearErrors } from "src/redux/features/errors/errorsSlice";
import {
  registrationFinished,
  setRegistrationFailed,
  startRegistration,
} from "src/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

const theme = createTheme();

const RegistrationBox = ({ handleSubmit }) => {
  return (
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
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link variant="body2" to={APPLICATION_URLS.login} component={RouterLink}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const SuccessfullRegistration = () => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography>Registration succeeded!</Typography>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        to={APPLICATION_URLS.login}
        component={RouterLink}
      >
        Go to login
      </Button>
    </Box>
  );
};

export function SignUp() {
  const registeredSuccessfully = useAppSelector((state) => state.users.registrationSuccessfull);
  const dispatch = useAppDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(startRegistration());
    dispatch(clearErrors());

    const data = new FormData(event.currentTarget);
    api
      .register(
        data.get("firstName") as string,
        data.get("lastName") as string,
        data.get("email") as string,
        data.get("password") as string
      )
      .then(() => dispatch(registrationFinished()))
      .catch(() => dispatch(setRegistrationFailed()));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {registeredSuccessfully ? (
          <SuccessfullRegistration />
        ) : (
          <RegistrationBox handleSubmit={handleSubmit} />
        )}
      </Container>
    </ThemeProvider>
  );
}