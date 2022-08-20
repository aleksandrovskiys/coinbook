import { ListItem, ListItemText, Typography } from "@mui/material";
import * as React from "react";
import { defaultLocale } from "src/common/constants";
import { Account } from "src/redux/features/accounts/accountsSlice";
import { AccountBalanceChange } from "./AccountBalanceChange";

export function AccountsListItem({ account }: { account: Account }) {
  const balance = account.balance.toLocaleString(defaultLocale, { style: "currency", currency: account.currency.code });
  const monthWorthChange = account.monthWorthChange.toLocaleString(defaultLocale, {
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
