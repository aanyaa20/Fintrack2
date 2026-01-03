export type ReportType = {
  period: string;
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  savingsRate: number;
  topSpendingCategories: Array<{ name: string; percent: number }>;
  insights: string[];
};