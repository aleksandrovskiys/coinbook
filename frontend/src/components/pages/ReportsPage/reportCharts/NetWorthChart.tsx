import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import * as React from "react";
import { Line } from "react-chartjs-2";
import useNetWorthData from "src/components/pages/ReportsPage/hooks/useNetWorthData";
import { ReportPeriodType, ReportProps } from "src/interfaces/reports";

const NetWorthChart = ({ startDate, endDate, periodType = ReportPeriodType.day }: ReportProps): JSX.Element => {
  const { labels, data, reportIsReady } = useNetWorthData({ startDate, endDate, periodType });
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };

  const reportData = {
    labels,
    datasets: [
      {
        data,
        label: "Net worth",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",

        stepped: true,
      },
    ],
  };

  if (!reportIsReady) return <div>Loading...</div>;

  return <Line options={options} data={reportData} />;
};

export default NetWorthChart;
