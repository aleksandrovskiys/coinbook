import { Box, FormControl, InputAdornment, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import * as React from "react";
import { getCurrencySymbol } from "src/common/utils";
import { StyledInput } from "src/components/common/StyledInput";
import { Operation } from "src/redux/features/operations/operationsSlice";
import { useAppSelector } from "src/redux/hooks";

export function EditOperation({ operation }: { operation: Operation }): JSX.Element {
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const categories = useAppSelector((state) => state.categories.categories);

  const [accountId, setAccountId] = React.useState<number>(operation.account.id);
  const [categoryId, setCategoryId] = React.useState<number | undefined>(operation.category?.id);
  const [amount, setAmount] = React.useState<string>(String(operation.amount));

  return (
    <ListItemText
      primary={
        <Box flexDirection="row" display="flex" alignItems="center" sx={{ marginBottom: "10px" }}>
          <Select
            variant="standard"
            value={accountId}
            size="small"
            onChange={(event) => {
              setAccountId(event.target.value as number);
              const account = accounts.find((element) => element.id === event.target.value);
              if (account) {
                operation.account = account;
              }
            }}
            sx={{ maxWidth: "25%", flexGrow: 1 }}
          >
            {accounts.map((account) => {
              return (
                <MenuItem key={account.id} value={account.id}>
                  {account.name}
                </MenuItem>
              );
            })}
          </Select>
          <FormControl sx={{ maxWidth: "25%", flexGrow: 1, marginLeft: "auto", input: { textAlign: "right" } }}>
            <StyledInput
              id="amount-input"
              value={amount}
              type="number"
              name="amount"
              size="small"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAmount(e.target.value);
                const amount = parseFloat(e.target.value.replace(",", "."));
                if (!isNaN(amount)) {
                  operation.amount = amount;
                }
              }}
              endAdornment={
                <InputAdornment position="start">{getCurrencySymbol(operation.account.currency.code)}</InputAdornment>
              }
            />
          </FormControl>
        </Box>
      }
      secondary={
        <Box flexDirection="row" display="flex" alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date"
              value={operation.date ? new Date(operation.date) : undefined}
              ampm={false}
              onChange={(value: Date | null) => {
                try {
                  if (value) {
                    const operationDate = value.toISOString();
                    operation.date = operationDate;
                  } else {
                    operation.date = "";
                  }
                } catch {}
              }}
              renderInput={(params) => <TextField variant="standard" size="small" name="date" {...params} />}
            />
          </LocalizationProvider>
          <Select
            variant="standard"
            value={categoryId}
            size="small"
            onChange={(event) => {
              setCategoryId(event.target.value as number);
              const category = categories.find((element) => element.id === event.target.value);
              if (category) {
                operation.category = category;
              }
            }}
            sx={{ maxWidth: "25%", flexGrow: 1, marginLeft: "auto", input: { textAlign: "right" } }}
          >
            {categories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
      }
    ></ListItemText>
  );
}
