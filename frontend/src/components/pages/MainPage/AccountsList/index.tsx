import { Button, List, Paper, Typography } from "@mui/material";
import * as React from "react";
import { AccountsListItem } from "src/components/pages/MainPage/AccountsList/AccountsListItem";
import { AddAccountForm } from "src/components/pages/MainPage/AccountsList/AddAccountForm";
import { AccountCreate, createAccount, fetchAccountsInformation } from "src/redux/features/accounts/accountsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

export function AccountsList() {
  const dispatch = useAppDispatch();

  const accounts = useAppSelector((state) => state.accounts.accounts);
  const userId = useAppSelector((state) => state.users.userInfo!.id);
  const operations = useAppSelector((state) => state.operations.operations);

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
  }, [dispatch, operations]);

  const content = accounts.length ? (
    accounts.map((account) => <AccountsListItem key={account.id} account={account} />)
  ) : (
    <Typography variant="h6" align="center">
      You have no accounts yet
    </Typography>
  );
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
        {<List disablePadding>{content}</List>}
      </Paper>
    </React.Fragment>
  );
}
