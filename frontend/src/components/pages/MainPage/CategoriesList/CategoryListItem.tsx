import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Category, deleteCategory, updateCategory } from "src/redux/features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

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
              <EditButtons show={isEditButtonsShown} toggleEditMode={toggleIsEdit} deleteOnClick={deleteOnClick} />
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
interface IEditButtonProps {
  show: boolean;
  toggleEditMode: () => void;
  deleteOnClick: () => void;
}

function EditButtons({ show, toggleEditMode, deleteOnClick }: IEditButtonProps): JSX.Element {
  return (
    <Collapse orientation="horizontal" in={show}>
      <Box flexDirection="row" display="flex" alignItems="center">
        <IconButton onClick={toggleEditMode}>
          <EditTwoToneIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={deleteOnClick}>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </Collapse>
  );
}
