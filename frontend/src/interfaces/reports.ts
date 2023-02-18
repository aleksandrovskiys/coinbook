import { Category } from "src/redux/features/categories/categoriesSlice";

export enum ReportTypes {
  netWorth = "net_worth",
  expenses = "expenses",
}

export enum ReportPeriodType {
  day = "day",
  week = "week",
  month = "month",
}

export interface NetWorthInPeriod {
  period: string;
  amount: number;
}

export interface NetWorthReportResponse {
  data: NetWorthInPeriod[];
  period_type: ReportPeriodType;
}

export interface CategoryWithExpenses extends Category {
  expenses: number;
  percentage_in_period: number;
}

export interface ExpensesReportResponse {
  period_start: string;
  period_end: string;
  category_expenses: CategoryWithExpenses[];
  total_expenses: number;
}

export interface ReportProps {
  startDate: Date;
  endDate: Date;
  periodType?: ReportPeriodType;
}
