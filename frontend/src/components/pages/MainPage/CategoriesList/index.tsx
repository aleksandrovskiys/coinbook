import { List, Paper, Typography } from "@mui/material";
import * as React from "react";
import { categoriesSelectorCreator, fetchUserCategories } from "src/redux/features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { CategoryListItem } from "./CategoryListItem";

export function CategoriesList() {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(categoriesSelectorCreator("expense"));

  React.useEffect(() => {
    dispatch(fetchUserCategories());
  }, [dispatch]);

  const content = categories.length ? (
    categories.map((category) => (
      <CategoryListItem key={category.id} name={category.name} monthExpenses={category.monthExpenses || 0} />
    ))
  ) : (
    <Typography variant="h6" align="center">
      You have no categories yet
    </Typography>
  );

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
