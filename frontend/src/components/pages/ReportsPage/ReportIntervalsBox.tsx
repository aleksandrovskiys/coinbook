import { Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import * as React from "react";
import { MonthPicker } from "src/components/common/MonthPicker";
interface IProps {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}

export function ReportIntervalsBox({ startDate, setStartDate, endDate, setEndDate }: IProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={2} marginBottom="15px" maxWidth="480px">
        <Grid item xs={12} sm={6}>
          <MonthPicker date={startDate} setDate={setStartDate} label="Start date" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MonthPicker date={endDate} setDate={setEndDate} label="End date" />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

export default ReportIntervalsBox;
