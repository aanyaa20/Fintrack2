import { Env } from "./env.config";

export const msg91Config = {
  authKey: Env.MSG91_AUTH_KEY,
  senderId: Env.MSG91_SENDER_ID || "FINTRC",
  route: "4", // 4 = Transactional, 1 = Promotional
};
