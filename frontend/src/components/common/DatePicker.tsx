import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";

interface IProps {
  value: string | null;
  setValue: (value: string | null) => void;
  variant?: "standard" | "outlined" | "filled" | undefined;
  showLabel?: boolean;
}

export const DatePicker = ({ value, setValue, variant, showLabel }: IProps): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label={showLabel && "Date"}
        value={value}
        ampm={false}
        onChange={setValue}
        renderInput={(params) => <TextField variant={variant} size="small" name="date" {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
