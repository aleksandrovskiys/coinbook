import { Box, Button, List, Paper, Typography } from "@mui/material";
import * as React from "react";
import { AddCategoryForm } from "src/components/pages/MainPage/CategoriesList/AddCategoryForm";
import { CategoryListItem } from "src/components/pages/MainPage/CategoriesList/CategoryListItem";
import {
  Category,
  clearNewCategory,
  createCategory,
  UserCategoryTypes,
} from "src/redux/features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

interface IProps {
  categoryType: UserCategoryTypes;
  categories: Category[];
}

export function CategoriesList({ categoryType, categories }: IProps): JSX.Element {
  const dispatch = useAppDispatch();

  const newCategory = useAppSelector((state) => state.categories.newCategory[categoryType]);
  const categoryCreationStatus = useAppSelector((state) => state.categories.categoryCreationStatus[categoryType]);
  const [addCategoryToggle, setAddCategoryToggle] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (categoryCreationStatus === "succeeded") {
      setAddCategoryToggle(false);
      dispatch(clearNewCategory(categoryType));
    }
  }, [categoryCreationStatus, categoryType, dispatch]);

  const content = categories.length ? (
    categories.map((category) => <CategoryListItem key={category.id} category={category} />)
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
    <Box marginTop={2} marginBottom={2}>
      {!addCategoryToggle && (
        <Button
          variant="outlined"
          sx={{ marginBottom: "10px" }}
          size="small"
          onClick={() => {
            setAddCategoryToggle(!addCategoryToggle);
          }}
        >
          New {categoryType}
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
    </Box>
  );
}
