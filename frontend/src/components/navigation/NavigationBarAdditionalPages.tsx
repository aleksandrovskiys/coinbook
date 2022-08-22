import Box from "@mui/material/Box";
import * as React from "react";
import { APPLICATION_URLS } from "src/common/constants";
import { NavigationItem } from "src/components/navigation/NavigationItem";

export function NavigationBarAdditionalPages({ isLoggedIn }: { isLoggedIn: string | null }): JSX.Element {
  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      {isLoggedIn && <NavigationItem to={APPLICATION_URLS.accounts} text="Accounts" />}
      {isLoggedIn && <NavigationItem to={APPLICATION_URLS.categories} text="Categories" />}
    </Box>
  );
}
