import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { api } from "src/api";
import { APPLICATION_URLS } from "src/components/common/constants";
import ErrorAlerts from "src/components/common/ErrorAlerts";
import NavigationBar from "src/components/navigation/NavigationBar";
import { Accounts } from "src/components/pages/Accounts";
import { Categories } from "src/components/pages/Categories";
import Login from "src/components/pages/Login";
import MainPage from "src/components/pages/MainPage";
import Profile from "src/components/pages/Profile";
import { SignUp } from "src/components/pages/Register";
import Settings from "src/components/pages/Settings";
import { updateUserInfo } from "src/redux/features/users/usersSlice";
import { useAppSelector } from "src/redux/hooks";

function App() {
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.users.userToken);
  useEffect(() => {
    const userToken = token;
    if (userToken) {
      api
        .getUserInfo()
        .then((resp) => resp.json())
        .then((data) => {
          dispatch(updateUserInfo(data));
        });
    }
  });
  return (
    <BrowserRouter>
      <NavigationBar />
      <ErrorAlerts />
      <Routes>
        <Route path={APPLICATION_URLS.profile} element={<Profile />} />
        <Route path={APPLICATION_URLS.settings} element={<Settings />} />
        <Route path={APPLICATION_URLS.accounts} element={<Accounts />} />
        <Route path={APPLICATION_URLS.categories} element={<Categories />} />
        <Route path={APPLICATION_URLS.register} element={<SignUp />} />
        <Route path={APPLICATION_URLS.login} element={<Login />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
