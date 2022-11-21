import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import * as React from "react";

interface IProps {
  amount: number;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  currencySymbol: string;
}

const MoneyInput = ({ amount, onChange, currencySymbol }: IProps) => (
  <FormControl fullWidth>
    <InputLabel htmlFor="amount-input" size="small">
      Amount
    </InputLabel>
    <OutlinedInput
      id="amount-input"
      value={amount}
      type="number"
      name="amount"
      size="small"
      onChange={onChange}
      inputProps={{
        min: 0,
        step: 0.01,
        pattern: "\\d*",
      }}
      endAdornment={<InputAdornment position="start">{currencySymbol}</InputAdornment>}
      label="Amount"
    />
  </FormControl>
);

export default MoneyInput;
