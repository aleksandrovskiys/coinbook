import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import {
  Account,
  AccountCreate,
  createAccount,
  fetchAccountsInformation,
  fetchAvailableCurrencies,
} from "src/redux/features/accounts/accountsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

function AccountBalanceChange({ change, displayText }: { change: number; displayText: string }) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "right",
        color: change > 0 ? "#0BDA51" : "crimson",
      }}
    >
      {change > 0 ? <ArrowDropUpIcon sx={{ color: "#0BDA51" }} /> : <ArrowDropDownIcon sx={{ color: "crimson" }} />}
      {`${displayText}`}
    </span>
  );
}

function AccountsListItem({ account }: { account: Account }) {
  const balance = account.balance.toLocaleString("de-DE", { style: "currency", currency: account.currency.code });
  const monthWorthChange = account.monthWorthChange.toLocaleString("de-DE", {
    style: "currency",
    currency: account.currency.code,
  });
  return (
    <ListItem disablePadding divider sx={{ padding: "2px 16px" }}>
      <ListItemText
        primary={
          <React.Fragment>
            {account.name}
            <Typography align="right" sx={{ display: "inline", float: "right" }}>
              {`${balance}`}
            </Typography>
          </React.Fragment>
        }
        secondary={<AccountBalanceChange change={account.monthWorthChange} displayText={monthWorthChange} />}
        sx={{ padding: "0" }}
      />
    </ListItem>
  );
}

export function AccountsList() {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.accounts.accountFetchStatus);
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const userId = useAppSelector((state) => state.users.userInfo!.id);

  const [addAccountToggle, setAddAccountToggle] = React.useState<boolean>(false);
  const [currencyCode, setCurrencyCode] = React.useState<string>("");
  const [accountName, setAccountName] = React.useState<string>("");

  const addAccountOnSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const account: AccountCreate = {
      name: data.get("newAccountName") as string,
      currencyCode: data.get("newAccountCurrencyCode") as string,
      userId: userId,
    };
    dispatch(createAccount(account));
    setAddAccountToggle(false);
    setCurrencyCode("");
    setAccountName("");
  };

  React.useEffect(() => {
    dispatch(fetchAccountsInformation());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Typography variant="h4" align="center" marginBottom={2} marginTop={6}>
        Accounts
      </Typography>
      {!addAccountToggle && (
        <Button
          variant="contained"
          sx={{ marginBottom: "10px" }}
          onClick={() => {
            setAddAccountToggle(!addAccountToggle);
          }}
        >
          New account
        </Button>
      )}
      {addAccountToggle && (
        <AddAccountForm
          currencyCode={currencyCode}
          setCurrencyCode={setCurrencyCode}
          name={accountName}
          setName={setAccountName}
          setAddAccountToggle={setAddAccountToggle}
          addAccountOnSubmit={addAccountOnSubmit}
        />
      )}
      <Paper sx={{ width: "100%" }} elevation={4}>
        {status === "pending" ? (
          <h1>Loading...</h1>
        ) : (
          <List disablePadding>
            {accounts?.map((account) => (
              <AccountsListItem key={account.id} account={account} />
            ))}
          </List>
        )}
      </Paper>
    </React.Fragment>
  );
}

function AddAccountForm({
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
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              value={currencyCode}
              label="Age"
              name="newAccountCurrencyCode"
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
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="success" type="submit">
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ marginLeft: "5px" }}
              onClick={() => {
                setAddAccountToggle(false);
                setName("");
                setCurrencyCode("");
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
