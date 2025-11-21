import { z } from "zod";
import { ReportFrequencyEnum } from "../models/report-setting.model";

export const reportSettingSchema = z.object({
  isEnabled: z.boolean().default(true),
  frequency: z.enum([
    ReportFrequencyEnum.WEEKLY,
    ReportFrequencyEnum.BI_WEEKLY,
    ReportFrequencyEnum.MONTHLY,
  ]).optional(),
});

export const updateReportSettingSchema = reportSettingSchema.partial();

export type UpdateReportSettingType = z.infer<typeof updateReportSettingSchema>;