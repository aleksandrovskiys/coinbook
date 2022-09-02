import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { NavigationBarAppName } from "src/components/navigation/NavigationBarAppName";
import { NavigationBarMenu } from "src/components/navigation/NavigationBarMenu";
import { useAppSelector } from "src/redux/hooks";

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const isLoggedIn = useAppSelector((state) => state.users.userToken);

  const handleOpenUserMenu = (event: { currentTarget: React.SetStateAction<null> }) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <NavigationBarAppName />
          <NavigationBarMenu
            isLoggedIn={isLoggedIn}
            handleOpenUserMenu={handleOpenUserMenu}
            anchorElUser={anchorElUser}
            handleCloseUserMenu={handleCloseUserMenu}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
