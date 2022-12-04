import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import * as React from "react";

interface IProps {
  amount: number | undefined;
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
      name="amount"
      size="small"
      onChange={onChange}
      inputProps={{
        min: 0,
        step: 0.01,
        pattern: "d+[.,]?d{0,2}",
        inputMode: "decimal",
      }}
      endAdornment={<InputAdornment position="start">{currencySymbol}</InputAdornment>}
      label="Amount"
    />
  </FormControl>
);

export default MoneyInput;
