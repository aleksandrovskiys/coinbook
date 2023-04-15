import { MenuItem, Select } from "@mui/material";
import * as React from "react";
import { EditableTextField } from "src/components/common/EditableTextField";
import { StyledInput } from "src/components/common/StyledInput";
import { Currency } from "src/redux/features/accounts/accountsSlice";

interface IProps {
  accountBalance: string;
  accountCurrencyCode: string;
  accountName: string;
  currencies: Currency[];
  isEditMode: boolean;
  setAccountBalance: React.Dispatch<React.SetStateAction<string>>;
  setAccountCurrencyCode: React.Dispatch<React.SetStateAction<string>>;
  setAccountName: React.Dispatch<React.SetStateAction<string>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountListItemEdit = ({
  accountBalance,
  accountCurrencyCode,
  accountName,
  currencies,
  isEditMode,
  setAccountBalance,
  setAccountCurrencyCode,
  setAccountName,
  setEditMode,
}: IProps) => {
  return (
    <React.Fragment>
      <EditableTextField
        isEditMode={isEditMode}
        value={accountName}
        setValue={setAccountName}
        setEditMode={setEditMode}
        textFieldSx={{ flexGrow: 1, maxWidth: "30%" }}
      />
      <StyledInput
        value={accountBalance}
        onChange={(e) => setAccountBalance(e.target.value.replace(",", "."))}
        className="amountInput"
        type="number"
        inputProps={{
          min: 0,
          step: 0.01,
          inputMode: "decimal",
        }}
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
  );
};

export default AccountListItemEdit;
