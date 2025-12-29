import UserModel from "../models/user.model";
import TransactionModel from "../models/transaction.model";
import ReportModel from "../models/report.model";
import ReportSettingModel from "../models/report-setting.model";
import { NotFoundException } from "../utils/app-error";
import { UpdateUserType } from "../validators/user.validator";
import mongoose from "mongoose";

export const findByIdUserService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  return user?.omitPassword();
};

export const updateUserService = async (
  userId: string,
  body: UpdateUserType,
  profilePic?: Express.Multer.File
) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundException("User not found");

  if (profilePic) {
    user.profilePicture = profilePic.path;
  }

  user.set({
    name: body.name,
    gender: body.gender,
    country: body.country,
    language: body.language,
  });

  await user.save();

  return user.omitPassword();
};

export const deleteAccountService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundException("User not found");

  const session = await mongoose.startSession();
  
  try {
    await session.withTransaction(async () => {
      // Delete all user's transactions
      await TransactionModel.deleteMany({ userId }, { session });
      
      // Delete all user's reports
      await ReportModel.deleteMany({ userId }, { session });
      
      // Delete user's report settings
      await ReportSettingModel.deleteMany({ userId }, { session });
      
      // Delete the user account
      await UserModel.findByIdAndDelete(userId, { session });
    });
  } finally {
    await session.endSession();
  }
};