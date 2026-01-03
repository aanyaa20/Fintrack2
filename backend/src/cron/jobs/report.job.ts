import { endOfMonth, endOfDay, format, startOfMonth, startOfDay, subMonths, subDays, subWeeks } from "date-fns";
import ReportSettingModel, { ReportFrequencyEnum } from "../../models/report-setting.model";
import { UserDocument } from "../../models/user.model";
import mongoose from "mongoose";
import { generateReportService } from "../../services/report.service";
import ReportModel, { ReportStatusEnum } from "../../models/report.model";
import { calulateNextReportDate } from "../../utils/helper";
import { sendReportEmail } from "../../mailers/report.mailer";

export const processReportJob = async () => {
  const now = new Date();

  let processedCount = 0;
  let failedCount = 0;

  try {
    const reportSettingCursor = ReportSettingModel.find({
      isEnabled: true,
      nextReportDate: { $lte: now },
    })
      .populate<{ userId: UserDocument }>("userId")
      .cursor();

    console.log("Running report ");

    for await (const setting of reportSettingCursor) {
      const user = setting.userId as UserDocument;
      if (!user) {
        console.log(`User not found for setting: ${setting._id}`);
        continue;
      }

      // Calculate date range based on frequency
      let from: Date;
      let to: Date;

      switch (setting.frequency) {
        case ReportFrequencyEnum.DAILY:
          // Yesterday's transactions
          from = startOfDay(subDays(now, 1));
          to = endOfDay(subDays(now, 1));
          break;
        case ReportFrequencyEnum.WEEKLY:
          // Last week's transactions
          from = startOfDay(subWeeks(now, 1));
          to = endOfDay(subDays(now, 1));
          break;
        case ReportFrequencyEnum.BI_WEEKLY:
          // Last 15 days
          from = startOfDay(subDays(now, 15));
          to = endOfDay(subDays(now, 1));
          break;
        case ReportFrequencyEnum.MONTHLY:
        default:
          // Last month (runs on 1st of month)
          from = startOfMonth(subMonths(now, 1));
          to = endOfMonth(subMonths(now, 1));
          break;
      }

      const session = await mongoose.startSession();

      try {
        const report = await generateReportService(user.id, from, to);

        console.log(report, "resport data");

        let emailSent = false;
        if (report) {
          try {
            // Use custom email if provided, otherwise use user's email
            const emailToSend = setting.email || user.email!;
            
            await sendReportEmail({
              email: emailToSend,
              username: user.name!,
              report: {
                period: report.period,
                totalIncome: report.summary.income,
                totalExpenses: report.summary.expenses,
                currentBalance: report.summary.balance,
                savingsRate: report.summary.savingsRate,
                topSpendingCategories: report.summary.topCategories,
                insights: report.insights,
              },
              frequency: setting.frequency!,
            });
            emailSent = true;
          } catch (error) {
            console.log(`Email failed for ${user.id}`);
          }
        }

        await session.withTransaction(
          async () => {
            const bulkReports: any[] = [];
            const bulkSettings: any[] = [];

            if (report && emailSent) {
              bulkReports.push({
                insertOne: {
                  document: {
                    userId: user.id,
                    sentDate: now,
                    period: report.period,
                    status: ReportStatusEnum.SENT,
                    createdAt: now,
                    updatedAt: now,
                  },
                },
              });

              bulkSettings.push({
                updateOne: {
                  filter: { _id: setting._id },
                  update: {
                    $set: {
                      lastSentDate: now,
                      nextReportDate: calulateNextReportDate(now, setting.frequency),
                      updatedAt: now,
                    },
                  },
                },
              });
            } else {
              bulkReports.push({
                insertOne: {
                  document: {
                    userId: user.id,
                    sentDate: now,
                    period:
                      report?.period ||
                      `${format(from, "MMMM d")}–${format(to, "d, yyyy")}`,
                    status: report
                      ? ReportStatusEnum.FAILED
                      : ReportStatusEnum.NO_ACTIVITY,
                    createdAt: now,
                    updatedAt: now,
                  },
                },
              });

              bulkSettings.push({
                updateOne: {
                  filter: { _id: setting._id },
                  update: {
                    $set: {
                      lastSentDate: null,
                      nextReportDate: calulateNextReportDate(now, setting.frequency),
                      updatedAt: now,
                    },
                  },
                },
              });
            }

            await Promise.all([
              ReportModel.bulkWrite(bulkReports, { ordered: false }),
              ReportSettingModel.bulkWrite(bulkSettings, { ordered: false }),
            ]);
          },
          {
            maxCommitTimeMS: 10000,
          }
        );

        processedCount++;
      } catch (error) {
        console.log(`Failed to process report`, error);
        failedCount++;
      } finally {
        await session.endSession();
      }
    }

    console.log(`✅Processed: ${processedCount} report`);
    console.log(`❌ Failed: ${failedCount} report`);

    return {
      success: true,
      processedCount,
      failedCount,
    };
  } catch (error) {
    console.error("Error processing reports", error);
    return {
      success: false,
      error: "Report process failed",
    };
  }
};