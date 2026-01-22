import { addDays, addMonths, addWeeks, addYears, startOfMonth } from "date-fns";
import { RecurringIntervalEnum } from "../models/transaction.model";
import { ReportFrequencyEnum } from "../models/report-setting.model";

export function calulateNextReportDate(
  lastSentDate?: Date,
  frequency: keyof typeof ReportFrequencyEnum = "MONTHLY"
): Date {
  const now = new Date();
  
  // Always calculate from current time for fresh start
  let nextDate: Date;

  switch (frequency) {
    case ReportFrequencyEnum.DAILY:
      // If it's before 11:59 PM today, schedule for today, else tomorrow
      const todayAt1159PM = new Date(now);
      todayAt1159PM.setHours(23, 59, 0, 0);
      
      if (now < todayAt1159PM) {
        nextDate = todayAt1159PM; // Today at 11:59 PM
      } else {
        nextDate = addDays(now, 1); // Tomorrow at 11:59 PM
      }
      break;
    case ReportFrequencyEnum.WEEKLY:
      nextDate = addWeeks(now, 1);
      break;
    case ReportFrequencyEnum.BI_WEEKLY:
      nextDate = addDays(now, 15);
      break;
    case ReportFrequencyEnum.MONTHLY:
    default:
      nextDate = startOfMonth(addMonths(now, 1));
      break;
  }

  // Set to 11:59 PM local time
  nextDate.setHours(23, 59, 0, 0);

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