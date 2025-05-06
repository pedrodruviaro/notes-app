import mongoose from "mongoose";
import process from "process";
import { ZodError } from "zod";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode);

  const responseObject = {
    title: "Error",
    message: err.message || "Something went wrong",
  };

  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400);
    responseObject.title = "Validation Error";
    responseObject.details = Object.values(err.errors).map((e) => ({
      path: e.path,
      message: e.message,
    }));
  }

  if (err instanceof ZodError) {
    res.status(400);
    responseObject.title = "Validation Error";
    responseObject.details = err.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));
  }

  if (process.env.NODE_ENV === "development") {
    responseObject.stackTrace = err.stack;
    responseObject.name = err.name;
  }

  res.json(responseObject);
};

export { errorHandler };
