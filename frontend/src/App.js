import NavigationBar from "./components/navigation/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logout from "./components/Logout";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import { Accounts } from "./components/Accounts";
import { Categories } from "./components/Categories";
import { APPLICATION_URLS } from "./components/common/constants";
import { SignUp } from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar />
      </div>
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

export default App;
