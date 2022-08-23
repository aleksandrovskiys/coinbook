import { Box, CircularProgress, ListItem, ListItemText, Typography } from "@mui/material";
import * as React from "react";
import { EditableTextField } from "src/components/common/EditableTextField";
import { EditButtons } from "src/components/common/EditButtons";
import { Category, deleteCategory, updateCategory } from "src/redux/features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { SubmitCancelButtons } from "../../../common/SubmitCancelButtons";

interface ICategoryListProps {
  category: Category;
}

export function CategoryListItem({ category }: ICategoryListProps) {
  const dispatch = useAppDispatch();

  const [isEditMode, setEditMode] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(category.name);
  const [isEditButtonsShown, setIsEditButtonsShown] = React.useState<boolean>(false);
  const categoryUpdateStatus = useAppSelector((state) => state.categories.categoryUpdateStatus[category.id]);

  const listItemRef = React.useRef(null);

  React.useEffect(() => {
    if (categoryUpdateStatus === "succeeded") {
      setValue(category.name);
      setEditMode(false);
    }
  }, [categoryUpdateStatus, category.name]);

  const toggleIsEdit = () => setEditMode(!isEditMode);
  const updateIconOnClick = () => {
    dispatch(updateCategory({ ...category, name: value }));
  };
  const cancelIconOnClick = () => {
    setEditMode(false);
    setValue(category.name);
  };
  const deleteOnClick = () => {
    dispatch(deleteCategory(category));
  };

  return (
    <ListItem
      disablePadding
      divider
      sx={{ padding: "2px 8px" }}
      onMouseOver={() => setIsEditButtonsShown(true)}
      onMouseOut={() => setIsEditButtonsShown(false)}
    >
      <ListItemText
        ref={listItemRef}
        primary={
          <Box flexDirection="row" display="flex" alignItems="center">
            <EditableTextField
              isEditMode={isEditMode}
              value={value}
              setValue={setValue}
              setEditMode={setEditMode}
              textFieldSx={{ flexGrow: 1, maxWidth: "50%" }}
            />

            <Typography sx={{ marginLeft: "auto", marginRight: "5px" }}>{category.monthExpenses || 0}</Typography>

            {categoryUpdateStatus === "pending" ? (
              <CircularProgress />
            ) : !isEditMode ? (
              <EditButtons show={isEditButtonsShown} toggleEditMode={toggleIsEdit} deleteOnClick={deleteOnClick} />
            ) : (
              <SubmitCancelButtons updateIconOnClick={updateIconOnClick} cancelIconOnClick={cancelIconOnClick} />
            )}
          </Box>
        }
      />
    </ListItem>
  );
}
