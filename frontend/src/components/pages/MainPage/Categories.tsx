import { List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import * as React from "react";

export function Categories() {
  return (
    <React.Fragment>
      <Typography variant="h4" align="center" marginBottom={2} marginTop={6}>
        Categories
      </Typography>
      <Paper sx={{ width: "100%" }} elevation={4}>
        <List>
          <CategoryListItem name="To be implemented" monthExpenses={500} />
        </List>
      </Paper>
    </React.Fragment>
  );
}

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
