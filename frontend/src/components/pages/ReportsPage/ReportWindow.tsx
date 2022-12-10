import { Box, Typography } from "@mui/material";
import * as React from "react";
import useNetWorthData from "src/components/pages/ReportsPage/hooks/useNetWorthData";
import NetWorthChart from "src/components/pages/ReportsPage/reportCharts/NetWorthChart";
import { NetWorthPeriodType, ReportTypes } from "src/interfaces/reports";
import { snakeToReadable } from "src/utils/common";

interface IProps {
  reportType: ReportTypes;
  startDate: Date;
  endDate: Date;
}

const ReportWindow = ({ reportType, startDate, endDate }: IProps): JSX.Element => {
  const { labels, data, reportIsReady } = useNetWorthData({ startDate, endDate, periodType: NetWorthPeriodType.day });

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
