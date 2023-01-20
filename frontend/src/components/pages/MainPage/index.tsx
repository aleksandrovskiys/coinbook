import { Box, Container, createTheme, Grid, Paper, styled, ThemeProvider } from "@mui/material";
import * as React from "react";
import { AccountsList } from "src/components/pages/MainPage/AccountsList";
import { CategoriesList } from "src/components/pages/MainPage/CategoriesList";
import { OperationsList } from "src/components/pages/MainPage/OperationsList";
import { fetchAccountsInformation, fetchAvailableCurrencies } from "src/redux/features/accounts/accountsSlice";
import { categoriesSelectorCreator, fetchUserCategories } from "src/redux/features/categories/categoriesSlice";
import { fetchOperations } from "src/redux/features/operations/operationsSlice";
import { useUser } from "src/redux/features/users/hooks";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

const theme = createTheme();

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

export default function MainPage() {
  const dispatch = useAppDispatch();

  const user = useUser();
  const expenseCategories = useAppSelector(categoriesSelectorCreator("expense"));
  const incomeCategories = useAppSelector(categoriesSelectorCreator("income"));
  const operations = useAppSelector((state) => state.operations.operations);
  const operationsFetchStatus = useAppSelector((state) => state.operations.status);
  const accounts = useAppSelector((state) => state.accounts.accounts);

  React.useEffect(() => {
    if (!!user) {
      dispatch(fetchOperations());
      dispatch(fetchAvailableCurrencies());
    }
  }, [dispatch, user]);

  React.useEffect(() => {
    if (!!user && (operationsFetchStatus === "succeeded" || operationsFetchStatus === "failed")) {
      dispatch(fetchUserCategories());
      dispatch(fetchAccountsInformation());
    }
  }, [dispatch, operations, operationsFetchStatus, user]);

  if (!user) return null;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={5} rowSpacing={5}>
            <Grid item sm={4} xs={12}>
              <AccountsList accounts={accounts} />
              <CategoriesList header="Expenses" categoryType="expense" categories={expenseCategories} />
              <CategoriesList header="Income" categoryType="income" categories={incomeCategories} />
            </Grid>
            <Grid item sm={8} xs={12}>
              <OperationsList operations={operations} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
