import { Box, Grid, TextField } from "@mui/material";
import * as React from "react";
import { SaveObjectButtons } from "src/components/common/SaveObjectButtons";
import { CategoryType, clearNewCategory, setNewCategoryName } from "src/redux/features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

export function AddCategoryForm({
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
            value={newCategory[categoryType].name}
            size="small"
            onChange={(e) => dispatch(setNewCategoryName({ type: categoryType, value: e.target.value }))}
            fullWidth
          />
        </Grid>
        <Grid item sm={6}>
          <SaveObjectButtons
            cancelOnClick={() => {
              setAddCategoryToggle(false);
              dispatch(clearNewCategory(categoryType));
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
