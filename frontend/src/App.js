import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { api } from "src/api";
import ErrorAlerts from "src/components/common/ErrorAlerts";
import { updateUserInfo } from "src/redux/features/users/usersSlice";
import { Accounts } from "./components/Accounts";
import { Categories } from "./components/Categories";
import { APPLICATION_URLS } from "./components/common/constants";
import Login from "./components/Login";
import Logout from "./components/Logout";
import MainPage from "./components/MainPage";
import NavigationBar from "./components/navigation/NavigationBar";
import Profile from "./components/Profile";
import { SignUp } from "./components/Register";
import Settings from "./components/Settings";

class App extends React.Component {
  componentDidMount() {
    const userToken = this.props.reduxState.users.userToken;
    if (userToken) {
      api
        .getUserInfo()
        .then((resp) => resp.json())
        .then((data) => {
          this.props.updateUserInfo(data);
        });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <NavigationBar />
        <ErrorAlerts />
        <Routes>
          <Route path={APPLICATION_URLS.profile} element={<Profile />} />
          <Route path={APPLICATION_URLS.logout} element={<Logout />} />
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
}

const mapStateToProps = (state) => ({
  reduxState: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (payload) => dispatch(updateUserInfo(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
