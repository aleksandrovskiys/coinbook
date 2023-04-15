import { Box, CircularProgress, ListItem, ListItemText } from "@mui/material";
import * as React from "react";
import { defaultLocale } from "src/common/constants";
import { EditButtons } from "src/components/common/EditButtons";
import { SubmitCancelButtons } from "src/components/common/SubmitCancelButtons";
import { AccountBalanceChange } from "src/components/pages/MainPage/AccountsList/AccountBalanceChange";
import AccountListItemEdit from "src/components/pages/MainPage/AccountsList/AccountListItemEdit";
import { Account, AccountUpdate, deleteAccount, updateAccount } from "src/redux/features/accounts/accountsSlice";
import { useCurrencies } from "src/redux/features/accounts/hooks/useCurrencies";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { AccountListItemView } from "./AccountListItemView";

export function AccountsListItem({ account }: { account: Account }) {
  const dispatch = useAppDispatch();
  const accountUpdateStatus = useAppSelector((state) => state.accounts.accountUpdateStatus);
  const currencies = useCurrencies();

  const [isEditMode, setEditMode] = React.useState<boolean>(false);
  const [accountBalance, setAccountBalance] = React.useState<string>(String(account.balance));
  const [accountName, setAccountName] = React.useState<string>(account.name);
  const [accountCurrencyCode, setAccountCurrencyCode] = React.useState<string>(account.currency.code);
  const [isEditButtonsShown, setIsEditButtonsShown] = React.useState<boolean>(false);

  const formattedBalance = account.balance.toLocaleString(defaultLocale, {
    style: "currency",
    currency: account.currency.code,
  });
  const monthWorthChange = account.monthWorthChange.toLocaleString(defaultLocale, {
    style: "currency",
    currency: account.currency.code,
  });

  React.useEffect(() => {
    if (accountUpdateStatus === "succeeded") {
      setEditMode(false);
    }
  }, [accountUpdateStatus]);

  const updateEditFields = React.useCallback(() => {
    setEditMode(false);
    setAccountBalance(String(account.balance));
    setAccountName(account.name);
    setAccountCurrencyCode(account.currency.code);
  }, [account.balance, account.currency.code, account.name]);

  React.useEffect(() => {
    updateEditFields();
  }, [account, updateEditFields]);

  const toggleIsEdit = () => setEditMode(!isEditMode);
  const cancelIconOnClick = () => {
    updateEditFields();
  };

  const updateIconOnClick = () => {
    const accountUpdateObject: AccountUpdate = {
      name: accountName,
      currencyCode: accountCurrencyCode,
      userId: account.userId,
      balance: Number.parseFloat(accountBalance),
      id: account.id,
    };
    dispatch(updateAccount(accountUpdateObject));
  };

  const deleteOnClick = () => {
    dispatch(deleteAccount(account));
  };

  return (
    <ListItem
      disablePadding
      sx={{ padding: "2px 16px" }}
      onMouseOver={() => setIsEditButtonsShown(true)}
      onMouseOut={() => setIsEditButtonsShown(false)}
    >
      <ListItemText
        primary={
          <Box flexDirection="row" display="flex" alignItems="center">
            {isEditMode ? (
              <AccountListItemEdit
                accountBalance={accountBalance}
                accountCurrencyCode={accountCurrencyCode}
                accountName={accountName}
                currencies={currencies}
                isEditMode={isEditMode}
                setAccountBalance={setAccountBalance}
                setAccountCurrencyCode={setAccountCurrencyCode}
                setAccountName={setAccountName}
                setEditMode={setEditMode}
              />
            ) : (
              <AccountListItemView
                formattedBalance={formattedBalance}
                setEditMode={setEditMode}
                accountName={accountName}
              />
            )}
            {accountUpdateStatus === "pending" ? (
              <CircularProgress />
            ) : !isEditMode ? (
              <EditButtons show={isEditButtonsShown} toggleEditMode={toggleIsEdit} deleteOnClick={deleteOnClick} />
            ) : (
              <SubmitCancelButtons updateIconOnClick={updateIconOnClick} cancelIconOnClick={cancelIconOnClick} />
            )}
          </Box>
        }
        secondary={<AccountBalanceChange change={account.monthWorthChange} displayText={monthWorthChange} />}
        sx={{ padding: "0" }}
      />
    </ListItem>
  );
}
