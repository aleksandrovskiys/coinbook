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
import { useNavigate } from "react-router-dom";
import { NavigationItem } from "./NavigationItem";
import { APPLICATION_URLS } from "../common/constants";

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

  const goHome = () => {
    navigate("/");
  };

  const accounts = () => {
    navigate(APPLICATION_URLS.accounts);
  };

  const categories = () => {
    navigate(APPLICATION_URLS.categories);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CurrencyExchangeIcon sx={{ mr: 1, display: "flex", cursor: "pointer" }} onClick={goHome} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={goHome}
            sx={{
              mr: 2,
              display: "flex",
              flexGrow: 1,
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
          <NavigationItem onClick={accounts} text="Accounts" />
          <NavigationItem onClick={categories} text="Categories" />
          <Box sx={{ flexGrow: 0 }}>
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
