import process from "node:process";
import jwt from "jsonwebtoken";
import { ERRORS } from "../contants/errors.js";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(ERRORS.UNAUTHORIZED);
    return next(new Error("No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    res.statusCode = ERRORS.UNAUTHORIZED;
    return next(new Error("Invalid or expired token"));
  }
}
