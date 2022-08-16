import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import * as React from "react";
import { Account, fetchAccountsInformation } from "src/redux/features/accounts/accountsSlice";
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

export function AccountsListItem({ account }: { account: Account }) {
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
  const status = useAppSelector((state) => state.accounts.status);
  const accounts = useAppSelector((state) => state.accounts.accounts);

  React.useEffect(() => {
    dispatch(fetchAccountsInformation());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Typography variant="h4" align="center" marginBottom={2} marginTop={6}>
        Accounts
      </Typography>
      <Paper sx={{ width: "100%" }} elevation={4}>
        {status === "pending" ? (
          <h1>Loading...</h1>
        ) : (
          <nav>
            <List disablePadding>
              {accounts?.map((account) => (
                <AccountsListItem key={account.id} account={account} />
              ))}
            </List>
          </nav>
        )}
      </Paper>
    </React.Fragment>
  );
}
