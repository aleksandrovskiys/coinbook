import { Typography } from "@mui/material";
import { endOfMonth, startOfMonth } from "date-fns";
import * as React from "react";
import ExpensesReportChart from "src/components/pages/ReportsPage/reportCharts/ExpensesChart";
import NetWorthChart from "src/components/pages/ReportsPage/reportCharts/NetWorthChart";
import ReportTypeSelector from "src/components/pages/ReportsPage/ReportTypeSelector";
import { ReportTypes } from "src/interfaces/reports";
import { snakeToReadable } from "src/utils/common";
import { ReportIntervalsBox } from "./ReportIntervalsBox";

const ReportTypeToComponent = {
  [ReportTypes.netWorth]: NetWorthChart,
  [ReportTypes.expenses]: ExpensesReportChart,
};

const ReportsContainer = (): JSX.Element => {
  const [startDate, setStartDate] = React.useState<Date>(startOfMonth(new Date()));
  const [endDate, setEndDate] = React.useState<Date>(endOfMonth(new Date()));
  const [reportType, setReportType] = React.useState<ReportTypes>(ReportTypes.netWorth);
  const Report = ReportTypeToComponent[reportType];

  return (
    <>
      <h1>Reports</h1>
      <ReportIntervalsBox startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      <ReportTypeSelector reportType={reportType} setReportType={setReportType} />
      <Typography textAlign="center" variant="h4">
        {snakeToReadable(reportType)} Report
      </Typography>
      <Report startDate={startDate} endDate={endDate} />
    </>
  );
};

export default ReportsContainer;
