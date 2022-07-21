import { Typography } from "@mui/material";

export function NavigationItem({ onClick, text }) {
  return (
    <Typography
      variant="h6"
      noWrap
      component="a"
      onClick={onClick}
      sx={{
        mr: 2,
        display: "flex",
        fontWeight: 700,
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {text}
    </Typography>
  );
}
