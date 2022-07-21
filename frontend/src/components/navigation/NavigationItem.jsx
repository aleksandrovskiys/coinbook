import { Button, Typography } from "@mui/material";

export function NavigationItem({ component, text }) {
  return (
    <Button
      noWrap
      component={component}
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
