import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";
import { useState } from "react";
import { getCurrencySymbol } from "src/common/utils";
import MoneyInput from "src/components/common/MoneyInput";
import { SaveObjectButtons } from "src/components/common/SaveObjectButtons";
import { categoriesSelectorCreator, UserCategoryTypes } from "src/redux/features/categories/categoriesSlice";
import { createOperation, OperationCreate } from "src/redux/features/operations/operationsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

interface IProps {
  setAddOperationToggle: CallableFunction;
  operationType: UserCategoryTypes;
}

export function AddOperationForm({ setAddOperationToggle, operationType }: IProps): JSX.Element {
  const [newOperation, setNewOperation] = useState<OperationCreate>({
    date: new Date().toISOString(),
    amount: undefined,
  });
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const categories = useAppSelector(categoriesSelectorCreator(operationType));
  const dispatch = useAppDispatch();
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(createOperation(newOperation));
  };

  const currencySymbol = getCurrencySymbol(
    accounts.find((account) => account.id === newOperation.accountId)?.currency.code
  );
  const amountOnChange = (e) => {
    setNewOperation({ ...newOperation, amount: parseFloat(e.target.value) });
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
              value={newOperation.accountId}
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
              value={newOperation.categoryId}
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date"
              value={newOperation.date ? new Date(newOperation.date) : undefined}
              ampm={false}
              onChange={(value: Date | null) => {
                try {
                  if (value) {
                    const operationDate = value.toISOString();
                    setNewOperation({ ...newOperation, date: operationDate });
                  }
                } catch {
                  setNewOperation({ ...newOperation, date: "" });
                }
              }}
              renderInput={(params) => <TextField size="small" name="date" {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={3}>
          {<MoneyInput amount={newOperation.amount || 0} onChange={amountOnChange} currencySymbol={currencySymbol} />}
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
