import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, List, Typography } from "@mui/material";
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
  header: string;
  categories: Category[];
}

export function CategoriesList({ categoryType, categories, header }: IProps): JSX.Element {
  const dispatch = useAppDispatch();

  const newCategory = useAppSelector((state) => state.categories.newCategory[categoryType]);
  const categoryCreationStatus = useAppSelector((state) => state.categories.categoryCreationStatus[categoryType]);
  const [addCategoryToggle, setAddCategoryToggle] = React.useState<boolean>(false);
  const total = categories.reduce((prev: number, next: Category) => prev + (next.monthExpenses || 0), 0);

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
    <>
      {!addCategoryToggle && (
        <Button
          variant="outlined"
          sx={{ marginBottom: "10px", marginTop: "15px" }}
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
      <Accordion sx={{ marginTop: "2px", marginBottom: "2px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" flexDirection="row" alignItems="center" sx={{ flexGrow: 1 }}>
            <Typography sx={{ flexGrow: 1, maxWidth: "30%" }}>{header}</Typography>
            <Typography sx={{ marginLeft: "auto" }}>{total} Total</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <List disablePadding>{content}</List>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
