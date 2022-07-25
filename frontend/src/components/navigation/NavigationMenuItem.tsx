import { MenuItem, Typography } from "@mui/material";
import * as React from "react";

function NavigationMenuItem({
  setting,
  onClick,
}: {
  setting: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <MenuItem key={setting} data-pointer={setting.toLowerCase()} onClick={onClick}>
      <Typography textAlign="center" data-pointer={setting.toLowerCase()}>
        {setting}
      </Typography>
    </MenuItem>
  );
}

export default NavigationMenuItem;
