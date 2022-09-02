import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { APPLICATION_URLS } from "src/common/constants";

export function NavigationBarAppName(): JSX.Element {
  return (
    <React.Fragment>
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
          flexGrow: 1,
        }}
      >
        Finance
      </Typography>
    </React.Fragment>
  );
}
