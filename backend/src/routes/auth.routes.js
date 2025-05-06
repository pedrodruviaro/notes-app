import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { userSchema, loginSchema } from "../validations/schemas/user.schema.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";

const router = Router();

router.post("/login", validateRequest("body", loginSchema), login);
router.post("/register", validateRequest("body", userSchema), register);

export { router };
