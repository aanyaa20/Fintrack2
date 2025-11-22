import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
  country: z.string().trim().max(100).optional(),
  language: z.string().trim().max(10).optional(),
});

export type UpdateUserType = z.infer<typeof updateUserSchema>;