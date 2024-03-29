import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import { getCurrencySymbol } from "src/common/utils";
import DatePicker from "src/components/common/DatePicker";
import MoneyInput from "src/components/common/MoneyInput";
import { SaveObjectButtons } from "src/components/common/SaveObjectButtons";
import { UserCategoryTypes, categoriesSelectorCreator } from "src/redux/features/categories/categoriesSlice";
import { OperationCreate, createOperation } from "src/redux/features/operations/operationsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

interface IProps {
  setAddOperationToggle: CallableFunction;
  operationType: UserCategoryTypes;
}

export function AddOperationForm({ setAddOperationToggle, operationType }: IProps): JSX.Element {
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const categories = useAppSelector(categoriesSelectorCreator(operationType));

  const [newOperation, setNewOperation] = useState<OperationCreate>({
    date: new Date().toISOString(),
    accountId: accounts.length > 0 ? accounts[0].id : undefined,
    categoryId: categories.length > 0 ? categories[0].id : undefined,
  });
  const dispatch = useAppDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(createOperation(newOperation));
  };

  const currencySymbol = getCurrencySymbol(
    accounts.find((account) => account.id === newOperation.accountId)?.currency.code
  );
  const amountOnChange = (e) => {
    setNewOperation({ ...newOperation, amount: e.target.value.replace(",", ".") });
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ margin: "10px 0px" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="account-label" size="small">
              Account
            </InputLabel>
            <Select
              labelId="account-label"
              value={newOperation.accountId || ""}
              label="Account"
              size="small"
              name="accountId"
              autoFocus
              onChange={(event) => {
                setNewOperation({ ...newOperation, accountId: event.target.value as number });
              }}
            >
              {accounts.map((account) => {
                return (
                  <MenuItem key={account.id} value={account.id}>
                    {account.name} ({account.currency.code})
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="category-label" size="small">
              Category
            </InputLabel>
            <Select
              labelId="category-label"
              value={newOperation.categoryId || ""}
              label="Category"
              name="categoryId"
              size="small"
              onChange={(event) => {
                setNewOperation({ ...newOperation, categoryId: event.target.value as number });
              }}
            >
              {categories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          {
            <DatePicker
              value={newOperation.date}
              setValue={(newValue) => setNewOperation({ ...newOperation, date: newValue })}
            />
          }
        </Grid>
        <Grid item xs={12} sm={3}>
          {<MoneyInput amount={newOperation.amount} onChange={amountOnChange} currencySymbol={currencySymbol} />}
        </Grid>
        <Grid item sm={12} alignItems="end">
          <SaveObjectButtons
            cancelOnClick={() => {
              setAddOperationToggle(false);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
