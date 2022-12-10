import { endOfMonth, startOfMonth } from "date-fns";
import * as React from "react";
import ReportTypeSelector from "src/components/pages/ReportsPage/ReportTypeSelector";
import ReportWindow from "src/components/pages/ReportsPage/ReportWindow";
import { ReportTypes } from "src/interfaces/reports";
import { ReportIntervalsBox } from "./ReportIntervalsBox";

const ReportsContainer = (): JSX.Element => {
  const [startDate, setStartDate] = React.useState<Date>(startOfMonth(new Date()));
  const [endDate, setEndDate] = React.useState<Date>(endOfMonth(new Date()));
  const [reportType, setReportType] = React.useState<ReportTypes>(ReportTypes.netWorth);
  return (
    <>
      <h1>Reports</h1>
      <ReportIntervalsBox startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      <ReportTypeSelector reportType={reportType} setReportType={setReportType} />
      <ReportWindow {...{ reportType }} />
    </>
  );
};

export default ReportsContainer;
