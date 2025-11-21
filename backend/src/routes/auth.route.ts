import { Router } from "express";
import {
  loginController,
  registerController,
  githubCallbackController,
  googleAuthController,
  microsoftAuthController,
} from "../controllers/auth.controller";
import passport from "passport";

const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);

// GitHub OAuth routes
authRoutes.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

authRoutes.get(
  "/github/callback",
  passport.authenticate("github", { 
    failureRedirect: "/auth/signin?error=authentication_failed",
    session: false 
  }),
  githubCallbackController
);

authRoutes.post("/google", googleAuthController);

authRoutes.post("/microsoft", microsoftAuthController);

export default authRoutes;