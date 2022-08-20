import { ListItem, ListItemText, Typography } from "@mui/material";
import * as React from "react";

export function CategoryListItem({ name, monthExpenses }: { name: string; monthExpenses: number }) {
  return (
    <ListItem disablePadding divider sx={{ padding: "2px 16px" }}>
      <ListItemText
        primary={
          <React.Fragment>
            {name}
            <Typography align="right" sx={{ display: "inline", float: "right" }}>
              {monthExpenses}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
