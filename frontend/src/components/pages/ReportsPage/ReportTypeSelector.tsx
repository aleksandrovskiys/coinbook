import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as React from "react";
import { ReportTypes } from "src/interfaces/reports";
import { snakeToReadable } from "src/utils/common";

interface IProps {
  reportType: ReportTypes;
  setReportType: React.Dispatch<React.SetStateAction<ReportTypes>>;
}

const ReportTypeSelector = ({ reportType, setReportType }: IProps): JSX.Element => {
  return (
    <FormControl size="small">
      <InputLabel id="report-type-selector-label">Report type</InputLabel>
      <Select
        labelId="report-type-selector-label"
        value={reportType}
        label="Report type"
        onChange={(e) => setReportType(e.target.value as ReportTypes)}
      >
        {Object.values(ReportTypes).map((el) => (
          <MenuItem value={el}>{snakeToReadable(el)}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ReportTypeSelector;
