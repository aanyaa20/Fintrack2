import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { Strategy as GitHubStrategy } from "passport-github2";
import passport from "passport";
import { Env } from "./env.config";
import { findByIdUserService } from "../services/user.service";
import UserModel from "../models/user.model";

interface JwtPayload {
  userId: string;
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Env.JWT_SECRET,
  audience: ["user"],
  algorithms: ["HS256"],
};

passport.use(
  new JwtStrategy(options, async (payload: JwtPayload, done) => {
    try {
      if (!payload.userId) {
        return done(null, false, { message: "Invalid token payload" });
      }

      const user = await findByIdUserService(payload.userId);
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

// GitHub OAuth Strategy
if (Env.GITHUB_CLIENT_ID && Env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: Env.GITHUB_CLIENT_ID,
        clientSecret: Env.GITHUB_CLIENT_SECRET,
        callbackURL: Env.GITHUB_CALLBACK_URL,
      },
      async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
          // Check if user already exists
          let user = await UserModel.findOne({ githubId: profile.id });

          if (!user) {
            // Check if email already exists
            const email = profile.emails?.[0]?.value;
            if (email) {
              user = await UserModel.findOne({ email });
            }

            if (user) {
              // Update existing user with GitHub ID
              user.githubId = profile.id;
              user.provider = "github";
              user.profilePicture = profile.photos?.[0]?.value || user.profilePicture;
              await user.save();
            } else {
              // Create new user
              user = await UserModel.create({
                githubId: profile.id,
                name: profile.displayName || profile.username,
                email: profile.emails?.[0]?.value || `${profile.username}@github.user`,
                profilePicture: profile.photos?.[0]?.value,
                provider: "github",
              });
            }
          }

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
}

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

export const passportAuthenticateJwt = passport.authenticate("jwt", {
  session: false,
});