import mongoose from "mongoose";

export enum ReportFrequencyEnum {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  BI_WEEKLY = "BI_WEEKLY",
  MONTHLY = "MONTHLY",
}

export interface ReportSettingDocument extends Document {
  userId: mongoose.Types.ObjectId;
  frequency: keyof typeof ReportFrequencyEnum;
  email?: string;
  isEnabled: boolean;
  nextReportDate?: Date;
  lastSentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const reportSettingSchema = new mongoose.Schema<ReportSettingDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    frequency: {
      type: String,
      enum: Object.values(ReportFrequencyEnum),
      default: ReportFrequencyEnum.MONTHLY,
    },
    email: {
      type: String,
      required: false,
    },
    isEnabled: {
      type: Boolean,
      default: false,
    },
    nextReportDate: {
      type: Date,
    },
    lastSentDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster userId lookups during authentication
reportSettingSchema.index({ userId: 1 });
reportSettingSchema.index({ isEnabled: 1, nextReportDate: 1 });

const ReportSettingModel = mongoose.model<ReportSettingDocument>(
  "ReportSetting",
  reportSettingSchema
);

export default ReportSettingModel;