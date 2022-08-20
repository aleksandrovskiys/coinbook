import { Button, List, Paper, Typography } from "@mui/material";
import * as React from "react";
import {
  categoriesSelectorCreator,
  CategoryType,
  clearNewCategory,
  createCategory,
  fetchUserCategories,
} from "src/redux/features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { AddCategoryForm } from "./AddCategoryForm";
import { CategoryListItem } from "./CategoryListItem";

export function CategoriesList({ categoryType }: { categoryType: CategoryType }) {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(categoriesSelectorCreator(categoryType));
  const newCategory = useAppSelector((state) => state.categories.newCategory[categoryType]);
  const categoryCreationStatus = useAppSelector((state) => state.categories.categoryCreationStatus[categoryType]);
  const [addCategoryToggle, setAddCategoryToggle] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(fetchUserCategories());
  }, [dispatch]);

  React.useEffect(() => {
    if (categoryCreationStatus === "succeeded") {
      setAddCategoryToggle(false);
      dispatch(clearNewCategory(categoryType));
    }
  }, [categoryCreationStatus, categoryType, dispatch]);

  const content = categories.length ? (
    categories.map((category) => (
      <CategoryListItem key={category.id} name={category.name} monthExpenses={category.monthExpenses || 0} />
    ))
  ) : (
    <Typography variant="h6" align="center">
      You have no categories yet
    </Typography>
  );

  function AddCategoryOnSubmit(event: React.FormEvent) {
    event.preventDefault();
    dispatch(createCategory({ type: categoryType, value: newCategory }));
  }

  return (
    <React.Fragment>
      {!addCategoryToggle && (
        <Button
          variant="outlined"
          sx={{ marginBottom: "10px" }}
          size="small"
          onClick={() => {
            setAddCategoryToggle(!addCategoryToggle);
          }}
        >
          New category
        </Button>
      )}
      {addCategoryToggle && (
        <AddCategoryForm
          setAddCategoryToggle={setAddCategoryToggle}
          addCategoryOnSubmit={AddCategoryOnSubmit}
          categoryType={categoryType}
        />
      )}
      <Paper sx={{ width: "100%" }} elevation={4}>
        <List disablePadding>{content}</List>
      </Paper>
    </React.Fragment>
  );
}
