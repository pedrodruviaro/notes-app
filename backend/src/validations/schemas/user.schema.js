import { z } from "zod";

export const userSchema = z.object({
  fullname: z
    .string({
      required_error: "Fullname is required",
    })
    .min(5),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  username: z.string({
    required_error: "Username is required",
  }),
  password: z
    .string({
      required_error: "Password !!is required",
    })
    .min(6),
  bio: z.string().optional(),
  jobtitle: z.string().optional(),
});

export const updateUserSchema = z.object({
  fullname: z
    .string({
      required_error: "Fullname is required",
    })
    .min(5)
    .optional(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6)
    .optional(),
  bio: z.string().optional(),
  jobtitle: z.string().optional(),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6),
});
