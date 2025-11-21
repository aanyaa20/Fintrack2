import mongoose from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import { NotFoundException, UnauthorizedException } from "../utils/app-error";
import {
  LoginSchemaType,
  RegisterSchemaType,
} from "../validators/auth.validator";
import ReportSettingModel, {
  ReportFrequencyEnum,
} from "../models/report-setting.model";
import { calulateNextReportDate } from "../utils/helper";
import { signJwtToken } from "../utils/jwt";
import { verifyFirebaseToken } from "../config/firebase.config";

export const registerService = async (body: RegisterSchemaType) => {
  const { email } = body;

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const existingUser = await UserModel.findOne({ email }).session(session);
      if (existingUser) throw new UnauthorizedException("User already exists");

      const newUser = new UserModel({
        ...body,
      });

      await newUser.save({ session });

      const reportSetting = new ReportSettingModel({
        userId: newUser._id,
        frequency: ReportFrequencyEnum.MONTHLY,
        isEnabled: true,
        nextReportDate: calulateNextReportDate(),
        lastSentDate: null,
      });
      await reportSetting.save({ session });

      return { user: newUser.omitPassword() };
    });
  } catch (error) {
    throw error;
  } finally {
    await session.endSession();
  }
};

export const loginService = async (body: LoginSchemaType) => {
  const { email, password } = body;
  const user = await UserModel.findOne({ email });
  if (!user) throw new NotFoundException("Email/password not found");

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid)
    throw new UnauthorizedException("Invalid email/password");

  const { token, expiresAt } = signJwtToken({ userId: user.id });

  const reportSetting = await ReportSettingModel.findOne(
    {
      userId: user.id,
    },
    { _id: 1, frequency: 1, isEnabled: 1 }
  ).lean();

  return {
    user: user.omitPassword(),
    accessToken: token,
    expiresAt,
    reportSetting,
  };
};

export const githubAuthService = async (user: UserDocument) => {
  // Find or create report settings
  let reportSetting = await ReportSettingModel.findOne({ userId: user._id });

  if (!reportSetting) {
    reportSetting = await ReportSettingModel.create({
      userId: user._id,
      frequency: ReportFrequencyEnum.MONTHLY,
      isEnabled: true,
      nextReportDate: calulateNextReportDate(),
      lastSentDate: null,
    });
  }

  const { token, expiresAt } = signJwtToken({ userId: user.id });

  return {
    user: user.omitPassword(),
    accessToken: token,
    expiresAt,
    reportSetting: {
      _id: reportSetting._id,
      frequency: reportSetting.frequency,
      isEnabled: reportSetting.isEnabled,
    },
  };
};

export const googleAuthService = async (firebaseToken: string) => {
  const decodedToken = await verifyFirebaseToken(firebaseToken);
  const { email, name, picture, uid } = decodedToken;

  if (!email) {
    throw new UnauthorizedException("Email not provided by Google");
  }

  let user = await UserModel.findOne({ googleId: uid });

  if (!user) {
    user = await UserModel.findOne({ email });

    if (user) {
      user.googleId = uid;
      user.provider = "google";
      user.profilePicture = picture || user.profilePicture;
      await user.save();
    } else {
      user = await UserModel.create({
        googleId: uid,
        name: name || email.split("@")[0],
        email,
        profilePicture: picture,
        provider: "google",
      });
    }
  }

  let reportSetting = await ReportSettingModel.findOne({ userId: user._id });

  if (!reportSetting) {
    reportSetting = await ReportSettingModel.create({
      userId: user._id,
      frequency: ReportFrequencyEnum.MONTHLY,
      isEnabled: true,
      nextReportDate: calulateNextReportDate(),
      lastSentDate: null,
    });
  }

  const { token, expiresAt } = signJwtToken({ userId: user.id });

  return {
    user: user.omitPassword(),
    accessToken: token,
    expiresAt,
    reportSetting: {
      _id: reportSetting._id,
      frequency: reportSetting.frequency,
      isEnabled: reportSetting.isEnabled,
    },
  };
};