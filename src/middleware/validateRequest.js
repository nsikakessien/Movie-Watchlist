import { boolean } from "zod";

// Middleware to validate request body using Zod schemas
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = result.error.format();

      const flattenedErrors = Object.values(formattedErrors)
        .flat()
        .filter(Boolean) // Remove empty error messages
        .map((err) => err._errors)
        .flat();

      return res
        .status(400)
        .json({ success: false, error: flattenedErrors.join(", ") });
    }

    next();
  };
};
