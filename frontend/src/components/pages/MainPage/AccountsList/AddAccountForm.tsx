import { Box, Grid, TextField } from "@mui/material";
import * as React from "react";
import { useCurrencies } from "src/redux/features/accounts/hooks/useCurrencies";
import { CurrencySelector } from "../../../common/CurrencySelector";
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
  const currencies = useCurrencies();

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
          <CurrencySelector value={currencyCode} setValue={setCurrencyCode} currencies={currencies} />
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
