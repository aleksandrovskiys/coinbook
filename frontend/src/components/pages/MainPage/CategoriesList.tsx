import { List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import * as React from "react";
import { categoriesSelectorCreator, fetchUserCategories } from "src/redux/features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

export function CategoriesList() {
  const dispatch = useAppDispatch();

  const loadStatus = useAppSelector((state) => state.categories.loadStatus);
  const categories = useAppSelector(categoriesSelectorCreator("expense"));

  React.useEffect(() => {
    dispatch(fetchUserCategories());
  }, [dispatch]);

  const content = categories.map((category) => (
    <CategoryListItem key={category.id} name={category.name} monthExpenses={category.monthExpenses || 0} />
  ));

  return (
    <React.Fragment>
      <Typography variant="h4" align="center" marginBottom={2} marginTop={6}>
        Categories
      </Typography>
      <Paper sx={{ width: "100%" }} elevation={4}>
        <List>{content}</List>
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
