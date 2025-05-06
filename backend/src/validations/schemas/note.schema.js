import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(2),
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(10),
  type: z.enum(["frontend", "backend", "fullstack"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be one of: frontend, backend or fullstack",
  }),
});
