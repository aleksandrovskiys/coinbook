import * as React from "react";
import { fetchNetWorthData, NetWorthReportParameters } from "src/redux/features/reports/netWorthReportSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

export const useNetWorthData = ({ startDate, endDate, periodType }: NetWorthReportParameters) => {
  const dispatch = useAppDispatch();
  const reportInfo = useAppSelector((state) => state.netWorthReport);
  const reportIsReady = reportInfo.status === "succeeded";

  React.useEffect(() => {
    dispatch(
      fetchNetWorthData({
        startDate,
        endDate,
        periodType: periodType,
      })
    );
  }, [dispatch, endDate, periodType, startDate]);

  const labels = reportInfo.data.map((el) => el.period.toLocaleDateString());
  const data = reportInfo.data.map((el) => el.amount);

  return { labels, data, reportIsReady };
};

export default useNetWorthData;
