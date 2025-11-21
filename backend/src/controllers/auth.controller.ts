import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middlerware";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { loginService, registerService, githubAuthService } from "../services/auth.service";
import { UserDocument } from "../models/user.model";
import { Env } from "../config/env.config";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse(req.body);

    const result = await registerService(body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully",
      data: result,
    });
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = loginSchema.parse({
      ...req.body,
    });
    const { user, accessToken, expiresAt, reportSetting } =
      await loginService(body);

    return res.status(HTTPSTATUS.OK).json({
      message: "User logged in successfully",
      user,
      accessToken,
      expiresAt,
      reportSetting,
    });
  }
);

export const githubCallbackController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as UserDocument;
    
    if (!user) {
      return res.redirect(`${Env.FRONTEND_ORIGIN}/auth/signin?error=authentication_failed`);
    }

    const { accessToken, expiresAt, reportSetting } = await githubAuthService(user);

    // Redirect to frontend with token
    const redirectUrl = `${Env.FRONTEND_ORIGIN}/auth/github/callback?token=${accessToken}&expiresAt=${expiresAt}`;
    return res.redirect(redirectUrl);
  }
);