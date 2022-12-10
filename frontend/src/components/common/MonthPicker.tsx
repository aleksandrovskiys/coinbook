import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import * as React from "react";

interface IProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export function MonthPicker({ date, setDate }: IProps) {
  return (
    <DatePicker
      views={["year", "month"]}
      value={date}
      onChange={setDate}
      renderInput={(params) => <TextField size="small" {...params} helperText={null} />}
      label="Start date"
    />
  );
}
