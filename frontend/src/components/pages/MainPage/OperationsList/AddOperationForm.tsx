import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";
import { useEffect } from "react";
import { getCurrencySymbol } from "src/common/utils";
import { SaveObjectButtons } from "src/components/common/SaveObjectButtons";
import { categoriesSelectorCreator, UserCategoryTypes } from "src/redux/features/categories/categoriesSlice";
import {
  clearNewOperation,
  setNewOperationAccountId,
  setNewOperationAmount,
  setNewOperationCategoryId,
  setNewOperationDate,
  startOperationCreation,
} from "src/redux/features/operations/operationsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

export function AddOperationForm({
  addOperationOnSubmit,
  setAddOperationToggle,
  operationType,
}: {
  addOperationOnSubmit: React.FormEventHandler;
  setAddOperationToggle: CallableFunction;
  operationType: UserCategoryTypes;
}): JSX.Element {
  const newOperation = useAppSelector((state) => state.operations.newOperation);
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const categories = useAppSelector(categoriesSelectorCreator(operationType));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startOperationCreation());
  }, [dispatch]);

  return (
    <Box component="form" onSubmit={addOperationOnSubmit} noValidate sx={{ margin: "10px 0px" }}>
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
                dispatch(setNewOperationAccountId(event.target.value));
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
                dispatch(setNewOperationCategoryId(event.target.value));
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
                    dispatch(setNewOperationDate(operationDate));
                  }
                } catch {
                  dispatch(setNewOperationDate(""));
                }
              }}
              renderInput={(params) => <TextField size="small" name="date" {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="amount-input" size="small">
              Amount
            </InputLabel>
            <OutlinedInput
              id="amount-input"
              value={newOperation.amount}
              type="number"
              name="amount"
              size="small"
              onChange={(e) => dispatch(setNewOperationAmount(e.target.value))}
              endAdornment={
                <InputAdornment position="start">
                  {getCurrencySymbol(accounts.find((account) => account.id === newOperation.accountId)?.currency.code)}
                </InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
        </Grid>
        <Grid item sm={12} alignItems="end">
          <SaveObjectButtons
            cancelOnClick={() => {
              setAddOperationToggle(false);
              dispatch(clearNewOperation());
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
