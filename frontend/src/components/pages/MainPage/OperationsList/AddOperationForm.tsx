import {
  Button,
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
import { categoriesSelectorCreator } from "src/redux/features/categories/categoriesSlice";
import {
  clearNewOperation,
  OperationType,
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
  operationType: OperationType;
}): JSX.Element {
  const newOperation = useAppSelector((state) => state.operations.newOperation);
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const categories = useAppSelector(categoriesSelectorCreator(operationType));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startOperationCreation(operationType));
  }, [dispatch, operationType]);

  return (
    <Box component="form" onSubmit={addOperationOnSubmit} noValidate sx={{ margin: "10px 0px" }}>
      <TextField name="type" sx={{ display: "none" }} value={operationType} />
      <Grid container spacing={1}>
        <Grid item sm={3}>
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
        <Grid item sm={3}>
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
        <Grid item sm={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date"
              value={newOperation.date ? Date.parse(newOperation.date) : undefined}
              onChange={(value: Date | null) => dispatch(setNewOperationDate(value?.toISOString()))}
              renderInput={(params) => <TextField size="small" name="date" {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item sm={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="amount-input" size="small">
              Amount
            </InputLabel>
            <OutlinedInput
              id="amount-input"
              value={newOperation.amount}
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
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" type="submit" size="small">
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ marginLeft: "5px" }}
              onClick={() => {
                setAddOperationToggle(false);
                dispatch(clearNewOperation());
              }}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
