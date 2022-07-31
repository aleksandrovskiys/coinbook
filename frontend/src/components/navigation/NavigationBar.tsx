import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { APPLICATION_URLS } from "src/common/constants";
import { NavigationItem } from "src/components/navigation/NavigationItem";
import NavigationMenuItem from "src/components/navigation/NavigationMenuItem";
import { logout } from "src/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const isLoggedIn = useAppSelector((state) => state.users.userToken);
  const dispatch = useAppDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CurrencyExchangeIcon sx={{ mr: 1, display: "flex" }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to={APPLICATION_URLS.home}
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Finance
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {isLoggedIn && <NavigationItem to={APPLICATION_URLS.accounts} text="Accounts" />}
            {isLoggedIn && <NavigationItem to={APPLICATION_URLS.categories} text="Categories" />}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            {!isLoggedIn && <NavigationItem to={APPLICATION_URLS.register} text="Register" />}
            {!isLoggedIn && <NavigationItem to={APPLICATION_URLS.login} text="Login" />}
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
