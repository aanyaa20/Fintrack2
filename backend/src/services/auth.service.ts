import mongoose from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import { NotFoundException, UnauthorizedException } from "../utils/app-error";
import {
  LoginSchemaType,
  RegisterSchemaType,
  ForgotPasswordSchemaType,
  ResetPasswordSchemaType,
} from "../validators/auth.validator";
import ReportSettingModel, {
  ReportFrequencyEnum,
} from "../models/report-setting.model";
import { calulateNextReportDate } from "../utils/helper";
import { signJwtToken } from "../utils/jwt";
import { verifyFirebaseToken } from "../config/firebase.config";
import { generateResetToken, hashResetToken } from "../utils/token";
import { sendForgotPasswordEmail } from "../mailers/auth.mailer";
import { sendWelcomeEmail } from "../mailers/welcome.mailer";

export const registerService = async (body: RegisterSchemaType) => {
  const { email, name } = body;

  const session = await mongoose.startSession();

  try {
    const result = await session.withTransaction(async () => {
      const existingUser = await UserModel.findOne({ email }).session(session);
      if (existingUser) throw new UnauthorizedException("User already exists");

      const newUser = new UserModel({
        ...body,
        welcomeEmailSent: false,
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

      // Send welcome email AFTER transaction completes (fire and forget)
      session.commitTransaction().then(() => {
        sendWelcomeEmail({ name, email })
          .then(async () => {
            await UserModel.findByIdAndUpdate(newUser._id, { 
              welcomeEmailSent: true 
            });
          })
          .catch((err) => {
            console.error("Welcome email failed:", err);
          });
      });

      return { user: newUser.omitPassword() };
    });

    return result;
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
    { _id: 1, frequency: 1, isEnabled: 1, email: 1, nextReportDate: 1, lastSentDate: 1 }
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
      email: reportSetting.email,
      nextReportDate: reportSetting.nextReportDate,
      lastSentDate: reportSetting.lastSentDate,
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
  let isNewUser = false;

  if (!user) {
    user = await UserModel.findOne({ email });

    if (user) {
      user.googleId = uid;
      user.provider = "google";
      user.profilePicture = picture || user.profilePicture;
      await user.save();
    } else {
      isNewUser = true;
      user = await UserModel.create({
        googleId: uid,
        name: name || email.split("@")[0],
        email,
        profilePicture: picture,
        provider: "google",
        welcomeEmailSent: false,
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

  // Send welcome email for new Google users
  if (isNewUser && !user.welcomeEmailSent) {
    sendWelcomeEmail({ name: user.name, email: user.email })
      .then(async () => {
        await UserModel.findByIdAndUpdate(user!._id, { welcomeEmailSent: true });
      })
      .catch((err) => {
        console.error("Welcome email failed:", err);
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
      email: reportSetting.email,
      nextReportDate: reportSetting.nextReportDate,
      lastSentDate: reportSetting.lastSentDate,
    },
  };
};

export const microsoftAuthService = async (firebaseToken: string) => {
  const decodedToken = await verifyFirebaseToken(firebaseToken);
  const { email, name, picture, uid } = decodedToken;

  if (!email) {
    throw new UnauthorizedException("Email not provided by Microsoft");
  }

  let user = await UserModel.findOne({ microsoftId: uid });
  let isNewUser = false;

  if (!user) {
    user = await UserModel.findOne({ email });

    if (user) {
      user.microsoftId = uid;
      user.provider = "microsoft";
      user.profilePicture = picture || user.profilePicture;
      await user.save();
    } else {
      isNewUser = true;
      user = await UserModel.create({
        microsoftId: uid,
        name: name || email.split("@")[0],
        email,
        profilePicture: picture,
        provider: "microsoft",
        welcomeEmailSent: false,
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

  // Send welcome email for new Microsoft users
  if (isNewUser && !user.welcomeEmailSent) {
    sendWelcomeEmail({ name: user.name, email: user.email })
      .then(async () => {
        await UserModel.findByIdAndUpdate(user!._id, { welcomeEmailSent: true });
      })
      .catch((err) => {
        console.error("Welcome email failed:", err);
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
      email: reportSetting.email,
      nextReportDate: reportSetting.nextReportDate,
      lastSentDate: reportSetting.lastSentDate,
    },
  };
};

export const forgotPasswordService = async (body: ForgotPasswordSchemaType) => {
  const { email } = body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    // Don't reveal if email exists for security
    return { message: "If the email exists, a reset link has been sent" };
  }

  // Only allow password reset for local auth users
  if (user.provider !== "local") {
    throw new UnauthorizedException(
      `This account uses ${user.provider} authentication. Please use ${user.provider} to sign in.`
    );
  }

  // Generate reset token
  const resetToken = generateResetToken();
  const hashedToken = hashResetToken(resetToken);

  // Save hashed token and expiry (1 hour)
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await user.save();

  // Log reset URL in development
  if (process.env.NODE_ENV === "development") {
    const resetUrl = `${process.env.FRONTEND_ORIGIN}/reset-password?token=${resetToken}`;
    console.log("\n🔐 PASSWORD RESET LINK:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`Email: ${user.email}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  }

  // Send email
  try {
    const emailResponse = await sendForgotPasswordEmail({
      email: user.email,
      username: user.name,
      resetToken,
    });
    
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Email sent successfully via Resend");
      console.log("Resend Response:", JSON.stringify(emailResponse, null, 2));
    }
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    // If email fails, clear the reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    throw new Error("Failed to send reset email. Please try again later.");
  }

  return { message: "Password reset email sent successfully" };
};

export const resetPasswordService = async (body: ResetPasswordSchemaType) => {
  const { token, newPassword } = body;

  const hashedToken = hashResetToken(token);

  // Find user with valid token and not expired
  const user = await UserModel.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  }).select("+resetPasswordToken +resetPasswordExpires");

  if (!user) {
    throw new UnauthorizedException("Invalid or expired reset token");
  }

  // Update password (will be hashed by pre-save hook)
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { message: "Password reset successfully" };
};
