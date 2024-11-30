import { Router } from "express";

import {
  forgotPasswordSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validation/auth";
import validateSchema from "../middlewares/validator";
import User from "../mongoose/schemas/user";
import { authenticate, authorize } from "../middlewares/user";
import { hashPassword } from "../utils/bcrypt";
import { transporter } from "../utils/mail";
import crypto from "crypto";

const router = Router();

router.post("/login", authenticate, (req, res) => {
  res.json({
    message: "Login successful",
    user: req.user,
  });
});

router.post("/register", validateSchema(registerSchema), async (req, res) => {
  const user = req.matchedData;
  user.password = hashPassword(user.password);

  const userExist = await User.findOne({
    email: user.email,
  });

  if (userExist) {
    res.status(400).json({
      message: "User already exists with this email",
    });
    return;
  }

  const newUser = new User(user);
  await newUser.save();

  const userObj = newUser.toObject();
  //   delete userObj.password;
  //   delete userObj.__v;

  res.json({
    message: "Register successful",
    user: userObj,
  });
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong",
      });
      return;
    }

    res.json({
      message: "Logout successful",
    });
  });
});

router.get("/current-user", authorize({ isAdmin: false }), (req, res) => {
  res.json({
    user: req.user,
  });
});

router.post(
  "/forgot-password",
  validateSchema(forgotPasswordSchema),
  async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "User not found with this email",
      });
      return;
    }
    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordTokenExpires = Date.now() + 3600000;
    await user.save();
    transporter.sendMail({
      from: '"Moment Rent Car" <agazadeulvi03@gmail.com>',
      to: email,
      subject: "Password Reset Request",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #0095f6;">Hello,</h2>
        <p style="font-size: 16px;">You requested a password reset. Click the button below to reset your password:</p>
        <a href="http://localhost:5173/reset-password/${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #0095f6; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p style="font-size: 14px; color: #666; margin-top: 20px;">If you did not request this, please ignore this email.</p>
        <p style="font-size: 14px; color: #666;">Thank you, <br> Your Team</p>
      </div>`,
    });
    res.json({
      message: "Email sent",
    });
  }
);

router.post(
  "/reset-password",
  validateSchema(resetPasswordSchema),
  async (req, res) => {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    user.password = hashPassword(password);
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpires = null;
    await user.save();

    res.json({
      message: "Password reset successful",
    });
  }
);
export default router;
