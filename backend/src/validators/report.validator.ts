import { z } from "zod";
import { ReportFrequencyEnum } from "../models/report-setting.model";

export const reportSettingSchema = z.object({
  isEnabled: z.boolean().default(true),
  frequency: z.enum([
    ReportFrequencyEnum.DAILY,
    ReportFrequencyEnum.WEEKLY,
    ReportFrequencyEnum.BI_WEEKLY,
    ReportFrequencyEnum.MONTHLY,
  ]).optional(),
  email: z.string().email().optional(),
});

export const updateReportSettingSchema = reportSettingSchema.partial();

export type UpdateReportSettingType = z.infer<typeof updateReportSettingSchema>;