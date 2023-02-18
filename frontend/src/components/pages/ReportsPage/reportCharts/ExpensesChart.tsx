import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import * as React from "react";
import { Doughnut } from "react-chartjs-2";
import { useExpensesReportData } from "src/components/pages/ReportsPage/hooks/useExpensesReportData";
import { ReportPeriodType, ReportProps } from "src/interfaces/reports";
import { useUser } from "src/redux/features/users/hooks";

const colorPalette = [
  "#fd7f6f",
  "#7eb0d5",
  "#b2e061",
  "#bd7ebe",
  "#ffb55a",
  "#ffee65",
  "#beb9db",
  "#fdcce5",
  "#8bd3c7",
];

export const ExpensesReportChart = ({ startDate, endDate, periodType }: ReportProps) => {
  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
  if (!periodType) periodType = ReportPeriodType.month;
  const { data, reportIsReady } = useExpensesReportData({ startDate, endDate, periodType });
  const user = useUser();

  const [currentPeriodIndex, setCurrentPeriodIndex] = React.useState(0);

  if (!reportIsReady || data.length === 0) return <div>Loading...</div>;

  const currentMonthData = data[currentPeriodIndex];
  const sortedCategoryExpenses = [...currentMonthData.category_expenses].sort((a, b) => b.expenses - a.expenses);

  const labels = sortedCategoryExpenses.map((category) => category.name);
  const expenses = sortedCategoryExpenses.map((category) => {
    return { value: category.expenses, percent: category.percentage_in_period };
  });

  const reportData = {
    labels: labels,
    datasets: [
      {
        data: expenses,
        backgroundColor: colorPalette,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (data: { value: number; percent: number }) => {
          if (data.percent > 5) return `${data.percent.toFixed(1)}%`;
          return null;
        },
      },
    },
  };

  return (
    <>
      <Box display="flex" justifyContent="center" mb={2}>
        <Box>
          <Typography variant="body1" component="span" sx={{ mr: 1 }}>
            Period:
          </Typography>
          <Typography variant="body1" component="span" sx={{ mr: 1 }}>
            {currentMonthData.period_start} - {currentMonthData.period_end}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mb={2}>
        <Box>
          <Typography variant="body1" component="span" sx={{ mr: 1 }}>
            Total expenses:
          </Typography>
          <Typography variant="body1" component="span" sx={{ mr: 1 }}>
            {currentMonthData.total_expenses} {user!.default_currency_code}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mb={2}>
        {data.length > 1 && (
          <>
            <Button disabled={currentPeriodIndex === 0} onClick={() => setCurrentPeriodIndex(currentPeriodIndex - 1)}>
              Previous month
            </Button>
            <Button
              disabled={currentPeriodIndex === data.length - 1}
              onClick={() => setCurrentPeriodIndex(currentPeriodIndex + 1)}
            >
              Next month
            </Button>
          </>
        )}
      </Box>

      <Box maxHeight="60vh" justifyContent="center" display="flex">
        <Doughnut data={reportData} options={options} />
      </Box>
    </>
  );
};

export default ExpensesReportChart;
