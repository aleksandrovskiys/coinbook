import { Button } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

export function NavigationItem({ to, text }: { to: string; text: string }) {
  return (
    <Button
      component={RouterLink}
      to={to}
      sx={{
        mr: 2,
        fontWeight: 700,
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
        display: "block",
      }}
    >
      {text}
    </Button>
  );
}
