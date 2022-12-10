import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { APPLICATION_URLS } from "src/common/constants";
import { NavigationItem } from "src/components/navigation/NavigationItem";
import NavigationMenuItem from "src/components/navigation/NavigationMenuItem";
import { logout } from "src/redux/features/users/usersSlice";
import { useAppDispatch } from "src/redux/hooks";

export interface IPropsNavigationBarMenu {
  isLoggedIn: string | null;
  handleOpenUserMenu: (event: any) => void;
  anchorElUser: null;
  handleCloseUserMenu: () => void;
}

export function NavigationBarMenu({
  isLoggedIn,
  handleOpenUserMenu,
  anchorElUser,
  handleCloseUserMenu,
}: IPropsNavigationBarMenu): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ flexGrow: 0, display: "flex" }}>
      {!isLoggedIn && <NavigationItem to={APPLICATION_URLS.register} text="Register" />}
      {!isLoggedIn && <NavigationItem to={APPLICATION_URLS.login} text="Login" />}
      {isLoggedIn && <NavigationItem to={APPLICATION_URLS.reports} text="Reports" />}
      {isLoggedIn && (
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
      )}
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <NavigationMenuItem
          setting="Profile"
          onClick={(e) => {
            const target = e.target as HTMLButtonElement;
            handleCloseUserMenu();
            navigate(target.dataset.pointer as string);
          }}
        />
        <NavigationMenuItem
          setting="Settings"
          onClick={(e) => {
            const target = e.target as HTMLButtonElement;
            handleCloseUserMenu();
            navigate(target.dataset.pointer as string);
          }}
        />
        <NavigationMenuItem
          setting="Logout"
          onClick={(e) => {
            handleCloseUserMenu();
            dispatch(logout());
            navigate("");
          }}
        />
      </Menu>
    </Box>
  );
}
