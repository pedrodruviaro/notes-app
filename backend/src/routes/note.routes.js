import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../controllers/note.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { noteSchema } from "../validations/schemas/note.schema.js";

const router = Router();

router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, getOne);
router.post("/", verifyToken, validateRequest("body", noteSchema), create);
router.put("/:id", validateRequest("body", noteSchema), verifyToken, update);
router.delete("/:id", verifyToken, remove);

export { router };
