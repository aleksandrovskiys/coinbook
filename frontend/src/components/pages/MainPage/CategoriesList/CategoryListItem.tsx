import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import * as React from "react";
import { Category, updateCategory } from "src/redux/features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

interface ICategoryListProps {
  category: Category;
}

export function CategoryListItem({ category }: ICategoryListProps) {
  const dispatch = useAppDispatch();

  const [isEditMode, setEditMode] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(category.name);
  const categoryUpdateStatus = useAppSelector((state) => state.categories.categoryUpdateStatus[category.id]);

  React.useEffect(() => {
    if (categoryUpdateStatus === "succeeded") {
      setValue(category.name);
      setEditMode(false);
    }
  }, [categoryUpdateStatus, category.name]);

  const toggleIsEdit = () => setEditMode(!isEditMode);
  const updateIconOnClick = (e: React.FormEvent) => {
    dispatch(updateCategory({ ...category, name: value }));
  };

  return (
    <ListItem disablePadding divider sx={{ padding: "2px 8px" }}>
      <ListItemText
        primary={
          <Box flexDirection="row" display="flex" alignItems="center">
            {isEditMode ? (
              <TextField
                variant="standard"
                value={value}
                disabled={!isEditMode}
                onChange={(e) => setValue(e.target.value)}
                sx={{ flexGrow: 1, maxWidth: "50%" }}
              />
            ) : (
              <Typography
                onClick={() => {
                  setEditMode(true);
                }}
              >
                {category.name}
              </Typography>
            )}

            <Typography sx={{ marginLeft: "auto", marginRight: "5px" }}>{category.monthExpenses || 0}</Typography>

            {categoryUpdateStatus === "pending" ? (
              <CircularProgress />
            ) : !isEditMode ? (
              <IconButton onClick={toggleIsEdit}>
                <EditTwoToneIcon fontSize="small" />
              </IconButton>
            ) : (
              <Box>
                <IconButton onClick={updateIconOnClick}>
                  <DoneIcon fontSize="small" color="success" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setEditMode(false);
                    setValue(category.name);
                  }}
                >
                  <CloseIcon fontSize="small" color="error" />
                </IconButton>
              </Box>
            )}
          </Box>
        }
      />
    </ListItem>
  );
}
