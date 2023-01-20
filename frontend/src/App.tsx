import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APPLICATION_URLS } from "src/common/constants";
import ErrorAlerts from "src/components/common/ErrorAlerts/ErrorAlerts";
import NavigationBar from "src/components/navigation/NavigationBar";
import LoginPage from "src/components/pages/Login";
import MainPage from "src/components/pages/MainPage";
import ProfilePage from "src/components/pages/ProfilePage";
import SignUpPage from "src/components/pages/Register";
import ReportsPage from "src/components/pages/ReportsPage";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={7} anchorOrigin={{ horizontal: "right", vertical: "bottom" }} autoHideDuration={5000}>
        <CssBaseline />
        <ErrorAlerts />
        <NavigationBar />
        <Routes>
          <Route path={APPLICATION_URLS.profile} element={<ProfilePage />} />
          <Route path={APPLICATION_URLS.register} element={<SignUpPage />} />
          <Route path={APPLICATION_URLS.login} element={<LoginPage />} />
          <Route path={APPLICATION_URLS.reports} element={<ReportsPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
