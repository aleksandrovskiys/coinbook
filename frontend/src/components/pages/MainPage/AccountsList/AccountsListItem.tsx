import { Box, CircularProgress, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import * as React from "react";
import { defaultLocale } from "src/common/constants";
import { EditableTextField } from "src/components/common/EditableTextField";
import { EditButtons } from "src/components/common/EditButtons";
import { SubmitCancelButtons } from "src/components/common/SubmitCancelButtons";
import { AccountBalanceChange } from "src/components/pages/MainPage/AccountsList/AccountBalanceChange";
import { Account, AccountUpdate, deleteAccount, updateAccount } from "src/redux/features/accounts/accountsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { StyledInput } from "../../../common/StyledInput";

export function AccountsListItem({ account }: { account: Account }) {
  const dispatch = useAppDispatch();
  const accountUpdateStatus = useAppSelector((state) => state.accounts.accountUpdateStatus);
  const currencies = useAppSelector((state) => state.accounts.currencies);

  const [isEditMode, setEditMode] = React.useState<boolean>(false);
  const [accountBalance, setAccountBalance] = React.useState<number>(account.balance);
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

  function clearEditFields() {
    setEditMode(false);
    setAccountBalance(account.balance);
    setAccountName(account.name);
    setAccountCurrencyCode(account.currency.code);
  }
  const toggleIsEdit = () => setEditMode(!isEditMode);
  const cancelIconOnClick = (e: React.FormEvent) => {
    clearEditFields();
  };

  const updateIconOnClick = () => {
    const accountUpdateObject: AccountUpdate = {
      name: accountName,
      currencyCode: accountCurrencyCode,
      userId: account.userId,
      balance: accountBalance,
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
      divider
      sx={{ padding: "2px 16px" }}
      onMouseOver={() => setIsEditButtonsShown(true)}
      onMouseOut={() => setIsEditButtonsShown(false)}
    >
      <ListItemText
        primary={
          <Box flexDirection="row" display="flex" alignItems="center">
            <EditableTextField
              isEditMode={isEditMode}
              value={accountName}
              setValue={setAccountName}
              setEditMode={setEditMode}
              textFieldSx={{ flexGrow: 1, maxWidth: "30%" }}
            />
            {isEditMode ? (
              <React.Fragment>
                <StyledInput
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(parseFloat(e.target.value))}
                  className="amountInput"
                  type="number"
                  sx={{
                    marginLeft: "auto",
                    marginRight: "5px",
                    maxWidth: "25%",
                    input: { textAlign: "right" },
                  }}
                />
                <Select
                  variant="standard"
                  value={accountCurrencyCode}
                  onChange={(event) => {
                    setAccountCurrencyCode(event.target.value);
                  }}
                  sx={{ maxWidth: "25%" }}
                >
                  {currencies.map((currency) => {
                    return (
                      <MenuItem key={currency.code} value={currency.code}>
                        {currency.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </React.Fragment>
            ) : (
              <Typography
                onClick={() => {
                  setEditMode(true);
                }}
                sx={{ marginLeft: "auto", marginRight: "5px" }}
              >
                {formattedBalance}
              </Typography>
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
