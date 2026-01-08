import { formatCurrency } from "../utils/format-currency";
import { getReportEmailTemplate } from "./templates/report.template";
import { sendEmail } from "./mailer";
import { ReportType } from "../@types/report.type";

type ReportEmailParams = {
  email: string;
  username: string;
  report: ReportType;
  frequency: string;
};

export const sendReportEmail = async (params: ReportEmailParams) => {
  const { email, username, report, frequency } = params;
  const html = getReportEmailTemplate(
    {
      username,
      ...report,
    },
    frequency
  );

  const topCategoriesText = report.topSpendingCategories
    .map((cat: any) => `  ${cat.name}: ${formatCurrency(cat.amount)} (${cat.percent}%)`)
    .join("\n");

  const text = `Your ${frequency} Financial Report (${report.period})

Financial Summary:
    Income: ${formatCurrency(report.totalIncome)}
    Expenses: ${formatCurrency(report.totalExpenses)}
    Balance: ${formatCurrency(report.currentBalance)}
    Savings Rate: ${report.savingsRate.toFixed(2)}%

Top Spending Categories:
${topCategoriesText}

This report was generated automatically based on your transactions during the specified period.
Keep tracking your finances to achieve your financial goals!
`;

  console.log(text, "text mail");

  return sendEmail({
    to: email,
    subject: `${frequency} Financial Report - ${report.period}`,
    text,
    html,
  });
};  