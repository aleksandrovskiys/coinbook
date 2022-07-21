import { MenuItem, Typography } from "@mui/material";

function NavigationMenuItem({ setting, onClick }) {
  return (
    <MenuItem key={setting} data-pointer={setting.toLowerCase()} onClick={onClick}>
      <Typography textAlign="center" data-pointer={setting.toLowerCase()}>
        {setting}
      </Typography>
    </MenuItem>
  );
}

export default NavigationMenuItem;
