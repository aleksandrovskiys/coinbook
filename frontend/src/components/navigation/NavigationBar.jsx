import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { NavigationItem } from "./NavigationItem";
import { APPLICATION_LINKS } from "../common/links";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoggedIn } from "src/redux/features/users/usersSlice";
import NavigationMenuItem from "src/components/navigation/NavigationMenuItem";
import { useNavigate } from "react-router-dom";

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();

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
            component={APPLICATION_LINKS.home}
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
            {isLoggedIn && (
              <NavigationItem component={APPLICATION_LINKS.accounts} text="Accounts" />
            )}
            {isLoggedIn && (
              <NavigationItem component={APPLICATION_LINKS.categories} text="Categories" />
            )}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            {!isLoggedIn && (
              <NavigationItem component={APPLICATION_LINKS.register} text="Register" />
            )}
            {!isLoggedIn && <NavigationItem component={APPLICATION_LINKS.login} text="Login" />}
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
                  handleCloseUserMenu();
                  navigate(e.target.dataset.pointer);
                }}
              />
              <NavigationMenuItem
                setting="Settings"
                onClick={(e) => {
                  handleCloseUserMenu();
                  navigate(e.target.dataset.pointer);
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
