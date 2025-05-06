import { ERRORS } from "../contants/errors.js";
import { ZodError } from "zod";
import process from "process";

const errorHandler = (err, _, res) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const responseObject = {
    message: err.message,
  };

  if (err instanceof ZodError) {
    responseObject.message = "Validation Error";
    responseObject.details = err.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));
  }

  if (process.env.NODE_ENV === "development") {
    responseObject.stackTrace = err.stack ?? "";
    responseObject.name = err.name;
  }

  switch (statusCode) {
    case ERRORS.VALIDATION_ERROR:
      responseObject.title = "Validation Error";
      break;
    case ERRORS.NOT_FOUND:
      responseObject.title = "Not Found";
      break;
    case ERRORS.UNAUTHORIZED:
      responseObject.title = "Unauthorized";
      break;
    case ERRORS.FORBIDDEN:
      responseObject.title = "Forbidden";
      break;
    case ERRORS.SERVER_ERROR:
      responseObject.title = "Internal server error";
      break;
    default:
      responseObject.title = "Unexpected error";
      break;
  }

  res.json(responseObject);
};

export { errorHandler };
