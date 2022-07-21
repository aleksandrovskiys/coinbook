import { Button } from "@mui/material";

export function NavigationItem({ component, text }) {
  return (
    <Button
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
