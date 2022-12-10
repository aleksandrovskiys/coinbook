import { Box, Typography } from "@mui/material";
import * as React from "react";
import NetWorthChart from "src/components/pages/ReportsPage/reportCharts/NetWorthChart";
import { NetWorthPeriodType, ReportTypes } from "src/interfaces/reports";
import { fetchNetWorthData } from "src/redux/features/reports/netWorthReportSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { snakeToReadable } from "src/utils/common";

interface IProps {
  reportType: ReportTypes;
  startDate: Date;
  endDate: Date;
}

const ReportWindow = ({ reportType, startDate, endDate }: IProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const reportInfo = useAppSelector((state) => state.netWorthReport);
  const reportIsReady = reportInfo.status === "succeeded";
  React.useEffect(() => {
    dispatch(
      fetchNetWorthData({
        startDate,
        endDate,
        periodType: NetWorthPeriodType.day,
      })
    );
  }, [dispatch, endDate, startDate]);

  const labels = reportInfo.data.map((el) => el.period.toLocaleDateString());
  const data = reportInfo.data.map((el) => el.amount);

  return (
    <Box>
      <Typography textAlign="center" variant="h4">
        {snakeToReadable(reportType)} Report
      </Typography>
      {reportType === ReportTypes.netWorth && reportIsReady ? (
        <NetWorthChart labels={labels} data={data} />
      ) : (
        <Typography textAlign="center" variant="h5">
          Not implemented yet
        </Typography>
      )}
    </Box>
  );
};

export default ReportWindow;
