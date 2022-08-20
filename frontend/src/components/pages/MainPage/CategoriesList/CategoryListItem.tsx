import { ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import * as React from "react";

export function CategoryListItem({ name, monthExpenses }: { name: string; monthExpenses: number }) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
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
      </ListItemButton>
    </ListItem>
  );
}
