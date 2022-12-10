import { Box, Typography } from "@mui/material";
import * as React from "react";
import { ReportTypes } from "src/interfaces/reports";
import { snakeToReadable } from "src/utils/common";

interface IProps {
  reportType: ReportTypes;
}

const ReportWindow = ({ reportType }: IProps): JSX.Element => {
  return (
    <Box>
      <Typography textAlign="center" variant="h4">
        {snakeToReadable(reportType)} Report
      </Typography>
      {reportType === ReportTypes.netWorth ? (
        <Typography textAlign="center">There should be a report</Typography>
      ) : (
        <Typography textAlign="center" variant="h5">
          Not implemented yet
        </Typography>
      )}
    </Box>
  );
};

export default ReportWindow;
