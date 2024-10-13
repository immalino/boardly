import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(256, { message: "Password must be less than 256 characters" }),
});
