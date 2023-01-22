import { Box, FormControl, InputAdornment, ListItemText, MenuItem, Select } from "@mui/material";
import * as React from "react";
import { getCurrencySymbol } from "src/common/utils";
import DatePicker from "src/components/common/DatePicker";
import { StyledInput } from "src/components/common/StyledInput";
import { Operation } from "src/redux/features/operations/operationsSlice";
import { useAppSelector } from "src/redux/hooks";

interface IProps {
  operation: Operation;
  setOperation: (value: Operation) => void;
}

export function EditOperation({ operation, setOperation }: IProps): JSX.Element {
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const categories = useAppSelector((state) => state.categories.categories);

  const [accountId, setAccountId] = React.useState<number>(operation.account.id);
  const [categoryId, setCategoryId] = React.useState<number | undefined>(operation.category?.id);
  const [amount, setAmount] = React.useState<number>(operation.amount);
  const [date, setDate] = React.useState<string>(operation.date);

  React.useEffect(() => {
    setOperation({
      ...operation,
      date: date,
      amount: amount,
      account: accounts.find((account) => account.id === accountId)!,
      category: categories.find((category) => category.id === categoryId)!,
    });
  }, [date, amount, accountId, categoryId, setOperation, operation, accounts, categories]);

  return (
    <ListItemText
      primary={
        <Box flexDirection="row" display="flex" alignItems="center" sx={{ marginBottom: "10px" }}>
          <Select
            variant="standard"
            value={accountId}
            size="small"
            onChange={(event) => {
              const account = accounts.find((element) => element.id === event.target.value);
              if (account) {
                setAccountId(account.id);
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
                const newAmount = parseFloat(e.target.value.replace(",", "."));
                if (!isNaN(newAmount)) {
                  setAmount(newAmount);
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
          <DatePicker
            value={date}
            setValue={(value) => {
              if (value) {
                setDate(value);
              }
            }}
            variant="standard"
            showLabel={false}
          />
          <Select
            variant="standard"
            value={categoryId}
            size="small"
            onChange={(event) => {
              const category = categories.find((element) => element.id === event.target.value);
              if (category) {
                setCategoryId(category.id);
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
