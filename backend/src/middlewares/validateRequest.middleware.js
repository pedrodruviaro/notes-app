import { ERRORS } from "../contants/errors.js";

/**
 * Middleware to validate req.body, req.params or req.query using Zod
 * @param {'body' | 'params' | 'query'} target
 * @param {ZodSchema} schema
 */
export function validateRequest(target, schema) {
  return (req, res, next) => {
    try {
      schema.parse(req[target]);
      next();
    } catch (error) {
      if (error.name === "ZodError") {
        res.statusCode = ERRORS.VALIDATION_ERROR;
        return next(error);
      }

      next(error);
    }
  };
}
