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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { APPLICATION_URLS } from "src/common/constants";
import { clearErrors } from "src/redux/features/errors/errorsSlice";
import { setRegistrationStatusIdle, startRegistration } from "src/redux/features/users/usersSlice";
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
            <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" />
          </Grid>
          <Grid item xs={12}>
            <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        onClick={() => {
          dispatch(setRegistrationStatusIdle());
          navigate(APPLICATION_URLS.login, { replace: true });
        }}
      >
        Go to login
      </Button>
    </Box>
  );
};

export function SignUp() {
  const registrationStatus = useAppSelector((state) => state.users.registrationStatus);
  const loginStatus = useAppSelector((state) => state.users.loginStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (loginStatus === "succeeded") {
    navigate(APPLICATION_URLS.home, { replace: true });
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const registrationData = {
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    dispatch(startRegistration(registrationData));
    dispatch(clearErrors());
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        {registrationStatus === "succeeded" ? (
          <SuccessfullRegistration />
        ) : (
          <RegistrationBox handleSubmit={handleSubmit} />
        )}
      </Container>
    </ThemeProvider>
  );
}
