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
import MenuItem from "@mui/material/MenuItem";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { NavigationItem } from "./NavigationItem";
import { APPLICATION_URLS } from "../common/constants";

const APPLICATION_LINKS = {};

for (const key in APPLICATION_URLS) {
  APPLICATION_LINKS[key] = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to={APPLICATION_URLS[key]} {...props} role={undefined} />
  ));
}

const settings = ["Profile", "Settings", "Logout"];

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

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
            <NavigationItem component={APPLICATION_LINKS.accounts} text="Accounts" />
            <NavigationItem component={APPLICATION_LINKS.categories} text="Categories" />
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <NavigationItem component={APPLICATION_LINKS.register} text="Register" />
            <NavigationItem component={APPLICATION_LINKS.login} text="Login" />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  data-pointer={setting.toLowerCase()}
                  onClick={(e) => {
                    handleCloseUserMenu();
                    navigate(e.target.dataset.pointer);
                  }}
                >
                  <Typography textAlign="center" data-pointer={setting.toLowerCase()}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
