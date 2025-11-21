import { addDays, addMonths, addWeeks, addYears, startOfMonth } from "date-fns";
import { RecurringIntervalEnum } from "../models/transaction.model";
import { ReportFrequencyEnum } from "../models/report-setting.model";

export function calulateNextReportDate(
  lastSentDate?: Date,
  frequency: keyof typeof ReportFrequencyEnum = "MONTHLY"
): Date {
  const now = new Date();
  const lastSent = lastSentDate || now;
  let nextDate: Date;

  switch (frequency) {
    case ReportFrequencyEnum.WEEKLY:
      nextDate = addWeeks(lastSent, 1);
      break;
    case ReportFrequencyEnum.BI_WEEKLY:
      nextDate = addWeeks(lastSent, 2);
      break;
    case ReportFrequencyEnum.MONTHLY:
    default:
      nextDate = startOfMonth(addMonths(lastSent, 1));
      break;
  }

  nextDate.setHours(0, 0, 0, 0);
  console.log(nextDate, "nextReportDate");
  return nextDate;
}

export function calculateNextOccurrence(
  date: Date,
  recurringInterval: keyof typeof RecurringIntervalEnum
) {
  const base = new Date(date);
  base.setHours(0, 0, 0, 0);

  switch (recurringInterval) {
    case RecurringIntervalEnum.DAILY:
      return addDays(base, 1);
    case RecurringIntervalEnum.WEEKLY:
      return addWeeks(base, 1);
    case RecurringIntervalEnum.MONTHLY:
      return addMonths(base, 1);
    case RecurringIntervalEnum.YEARLY:
      return addYears(base, 1);
    default:
      return base;
  }
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}