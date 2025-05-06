import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import { updateUserSchema } from "../validations/schemas/user.schema.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();

// private routes
router.get("/", verifyToken, getProfile);
router.put(
  "/",
  verifyToken,
  validateRequest("body", updateUserSchema),
  updateProfile,
);

export { router };
