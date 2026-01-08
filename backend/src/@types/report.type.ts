export type ReportType = {
  period: string;
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  savingsRate: number;
  topSpendingCategories: Array<{ name: string; amount: number; percent: number }>;
  insights: string[];
};