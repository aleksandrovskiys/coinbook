import { Box, Button, Grid, List, Paper, TextField, Typography } from "@mui/material";
import * as React from "react";
import { SaveObjectButtons } from "src/components/common/SaveObjectButtons";
import {
  categoriesSelectorCreator,
  CategoryType,
  clearNewCategory,
  createCategory,
  fetchUserCategories,
  setNewCategoryName,
} from "src/redux/features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { CategoryListItem } from "./CategoryListItem";

export function CategoriesList() {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(categoriesSelectorCreator("expense"));
  const newCategory = useAppSelector((state) => state.categories.newCategory);
  const categoryCreationStatus = useAppSelector((state) => state.categories.categoryCreationStatus);
  const [addCategoryToggle, setAddCategoryToggle] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(fetchUserCategories());
  }, [dispatch]);

  React.useEffect(() => {
    if (categoryCreationStatus === "succeeded") {
      setAddCategoryToggle(false);
      dispatch(clearNewCategory());
    }
  }, [categoryCreationStatus, dispatch]);

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
    dispatch(createCategory(newCategory));
  }

  return (
    <React.Fragment>
      <Typography variant="h4" align="center" marginBottom={2} marginTop={6}>
        Categories
      </Typography>
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
          categoryType={"expense"}
        />
      )}
      <Paper sx={{ width: "100%" }} elevation={4}>
        <List>{content}</List>
      </Paper>
    </React.Fragment>
  );
}

function AddCategoryForm({
  setAddCategoryToggle,
  addCategoryOnSubmit,
  categoryType,
}: {
  setAddCategoryToggle: CallableFunction;
  addCategoryOnSubmit: React.FormEventHandler;
  categoryType: CategoryType;
}) {
  const dispatch = useAppDispatch();

  const newCategory = useAppSelector((state) => state.categories.newCategory);

  return (
    <Box component="form" onSubmit={addCategoryOnSubmit} noValidate sx={{ margin: "10px 0px" }}>
      <Grid container spacing={1}>
        <Grid item sm={6}>
          <TextField
            name="categoryName"
            label="Name"
            value={newCategory.name}
            size="small"
            onChange={(e) => dispatch(setNewCategoryName(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item sm={6}>
          <SaveObjectButtons
            cancelOnClick={() => {
              setAddCategoryToggle(false);
              dispatch(clearNewCategory());
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
