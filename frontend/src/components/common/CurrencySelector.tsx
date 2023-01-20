import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as React from "react";
import { Currency } from "src/redux/features/accounts/accountsSlice";

interface IProps {
  value: string;
  setValue: CallableFunction;
  currencies: Currency[];
  disabled?: boolean;
}

export const CurrencySelector = ({ value, setValue, currencies, disabled }: IProps): JSX.Element => {
  return (
    <FormControl fullWidth>
      <InputLabel id="currency-label" size="small">
        Currency
      </InputLabel>
      <Select
        labelId="currency-label"
        value={value}
        label="Currency"
        name="newAccountCurrencyCode"
        size="small"
        onChange={(event) => {
          setValue(event.target.value);
        }}
        disabled={disabled}
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
  );
};

export default CurrencySelector;
