import { Box } from "@mui/system";
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
    <Box paddingBottom="15px" display="flex" justifyContent="space-between" maxWidth="480px">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MonthPicker date={startDate} setDate={setStartDate} />
        <MonthPicker date={endDate} setDate={setEndDate} />
      </LocalizationProvider>
    </Box>
  );
}

export default ReportIntervalsBox;
