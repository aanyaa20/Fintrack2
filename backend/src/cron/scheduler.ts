import cron from "node-cron";
import { processRecurringTransactions } from "./jobs/transaction.job";
import { processReportJob } from "./jobs/report.job";

const scheduleJob = (name: string, time: string, job: Function) => {
  console.log(`Scheduling ${name} at ${time}`);

  return cron.schedule(
    time,
    async () => {
      try {
        await job();
        console.log(`${name} completed`);
      } catch (error) {
        console.log(`${name} failed`, error);
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );
};

export const startJobs = () => {
  return [
    scheduleJob("Transactions", "5 0 * * *", processRecurringTransactions),

    // Run daily at 11:59 PM to check all scheduled reports
    scheduleJob("Scheduled Reports", "59 23 * * *", processReportJob),
  ];
};