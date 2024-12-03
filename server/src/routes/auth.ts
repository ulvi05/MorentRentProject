import { Router } from "express";

import {
  forgotPasswordSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validation/auth";

import validateSchema from "../middlewares/validator";
import { authenticate } from "../middlewares/user";
import authController from "../controllers/auth";

const router = Router();

router.post("/login", authenticate, authController.login);

router.post(
  "/register",
  validateSchema(registerSchema),
  authController.register
);

router.post("/logout", authController.logout);

router.get("/current-user", authController.currentUser);

router.post(
  "/forgot-password",
  validateSchema(forgotPasswordSchema),
  authController.forgotPassword
);

router.post(
  "/reset-password",
  validateSchema(resetPasswordSchema),
  authController.resetPassword
);
export default router;
