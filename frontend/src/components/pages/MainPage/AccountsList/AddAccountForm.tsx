import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import * as React from "react";
import { fetchAvailableCurrencies } from "src/redux/features/accounts/accountsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { SaveObjectButtons } from "../../../common/SaveObjectButtons";

export function AddAccountForm({
  currencyCode,
  setCurrencyCode,
  name,
  setName,
  setAddAccountToggle,
  addAccountOnSubmit,
}: {
  currencyCode: string;
  setCurrencyCode: CallableFunction;
  name: string;
  setName: CallableFunction;
  setAddAccountToggle: CallableFunction;
  addAccountOnSubmit: React.FormEventHandler;
}): JSX.Element {
  const currencies = useAppSelector((state) => state.accounts.currencies);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAvailableCurrencies());
  }, [dispatch]);

  return (
    <Box component="form" onSubmit={addAccountOnSubmit} noValidate sx={{ margin: "10px 0px" }}>
      <Grid container spacing={1}>
        <Grid item sm={6}>
          <TextField
            name="newAccountName"
            label="Name"
            value={name}
            size="small"
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth>
            <InputLabel id="currency-label" size="small">
              Currency
            </InputLabel>
            <Select
              labelId="currency-label"
              value={currencyCode}
              label="Currency"
              name="newAccountCurrencyCode"
              size="small"
              onChange={(event) => {
                setCurrencyCode(event.target.value);
              }}
            >
              {currencies.map((currency) => {
                return (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12} alignItems="end">
          <SaveObjectButtons
            cancelOnClick={() => {
              setAddAccountToggle(false);
              setName("");
              setCurrencyCode("");
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
