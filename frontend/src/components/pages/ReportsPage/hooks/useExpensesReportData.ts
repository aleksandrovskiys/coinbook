import * as React from "react";
import { ExpensesReportResponse } from "src/interfaces/reports";
import { ExpensesReportParameters, fetchExpensesData } from "src/redux/features/reports/expensesReportSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

export const useExpensesReportData = ({
  startDate,
  endDate,
  periodType,
}: ExpensesReportParameters): { reportIsReady: boolean; data: ExpensesReportResponse[] } => {
  const dispatch = useAppDispatch();
  const reportInfo = useAppSelector((state) => state.expensesReport);
  const reportIsReady = reportInfo.status === "succeeded";

  React.useEffect(() => {
    dispatch(
      fetchExpensesData({
        startDate,
        endDate,
        periodType: periodType,
      })
    );
  }, [dispatch, endDate, periodType, startDate]);

  return { data: reportInfo.data, reportIsReady };
};
