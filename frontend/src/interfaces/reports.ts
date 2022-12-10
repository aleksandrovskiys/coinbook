export enum ReportTypes {
  netWorth = "net_worth",
  expenses = "expenses",
}

export enum NetWorthPeriodType {
  day = "day",
  week = "week",
  month = "month",
  quarter = "quarter",
}

export interface NetWorthInPeriod {
  period: string;
  amount: number;
}

export interface NetWorthReportResponse {
  data: NetWorthInPeriod[];
  period_type: NetWorthPeriodType;
}
