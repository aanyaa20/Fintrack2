import { Router } from "express";
import {
  getCurrentUserController,
  updateUserController,
  deleteAccountController,
} from "../controllers/user.controller";
import { upload } from "../config/cloudinary.config";

const userRoutes = Router();

userRoutes.get("/current-user", getCurrentUserController);
userRoutes.put(
  "/update",
  upload.single("profilePicture"),
  updateUserController
);
userRoutes.delete("/delete-account", deleteAccountController);

export default userRoutes;