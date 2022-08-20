import { Button, List, Paper, Typography } from "@mui/material";
import * as React from "react";
import { AccountCreate, createAccount, fetchAccountsInformation } from "src/redux/features/accounts/accountsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { AccountsListItem } from "./AccountsListItem";
import { AddAccountForm } from "./AddAccountForm";

export function AccountsList() {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.accounts.accountFetchStatus);
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

  return (
    <React.Fragment>
      <Typography variant="h4" align="center" marginBottom={2} marginTop={6}>
        Accounts
      </Typography>
      {!addAccountToggle && (
        <Button
          variant="outlined"
          sx={{ marginBottom: "10px" }}
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
            {accounts?.map((account) => (
              <AccountsListItem key={account.id} account={account} />
            ))}
          </List>
        }
      </Paper>
    </React.Fragment>
  );
}
