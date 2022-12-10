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

interface IProps {
  labels: string[];
  data: number[];
}

const NetWorthChart = ({ labels, data }: IProps): JSX.Element => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
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

  return <Line options={options} data={reportData} />;
};

export default NetWorthChart;
