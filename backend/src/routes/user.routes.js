import { Router } from "express";
import {
  login,
  register,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";
import {
  userSchema,
  loginSchema,
  updateUserSchema,
} from "../validations/schemas/user.schema.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();

router.post("/login", validateRequest("body", loginSchema), login);
router.post("/register", validateRequest("body", userSchema), register);

// private routes
router.get("/profile", verifyToken, getProfile);
router.put(
  "/profile",
  verifyToken,
  validateRequest("body", updateUserSchema),
  updateProfile,
);

export { router };
