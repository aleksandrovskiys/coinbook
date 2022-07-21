import NavigationBar from "./components/navigation/NavigationBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Logout from "./components/Logout";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavigationBar/>
            </div>
            <Routes>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/" element={<MainPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
