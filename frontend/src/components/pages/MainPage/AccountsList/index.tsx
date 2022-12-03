import { Button, Divider, List, Paper, Typography } from "@mui/material";
import * as React from "react";
import { AccountsListItem } from "src/components/pages/MainPage/AccountsList/AccountsListItem";
import AccountsTotal, { CurrencyTotal } from "src/components/pages/MainPage/AccountsList/AccountsTotal";
import { AddAccountForm } from "src/components/pages/MainPage/AccountsList/AddAccountForm";
import { Account, AccountCreate, createAccount } from "src/redux/features/accounts/accountsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

interface IProps {
  accounts: Account[];
}

export function AccountsList({ accounts }: IProps) {
  const dispatch = useAppDispatch();

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

  const currencyTotals: CurrencyTotal[] = [];
  for (const account of accounts) {
    let currencyTotal = currencyTotals.find((el) => el.currencyCode === account.currency.code);

    if (currencyTotal === undefined) {
      currencyTotal = {
        currencyCode: account.currency.code,
        total: 0,
      };
      currencyTotals.push(currencyTotal);
    }

    currencyTotal.total += account.balance;
  }

  return (
    <React.Fragment>
      {!addAccountToggle && (
        <Button
          variant="outlined"
          sx={{ marginBottom: "10px", marginTop: "30px" }}
          size="small"
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
        {
          <List disablePadding>
            {accounts.length ? (
              accounts.map((account, index) => (
                <>
                  <AccountsListItem key={account.id} account={account} />
                </>
              ))
            ) : (
              <Typography variant="h6" align="center">
                You have no accounts yet
              </Typography>
            )}
          </List>
        }
        <Divider textAlign="left">Total</Divider>
        {currencyTotals.map((currencyTotal) => (
          <AccountsTotal {...currencyTotal} />
        ))}
      </Paper>
    </React.Fragment>
  );
}
