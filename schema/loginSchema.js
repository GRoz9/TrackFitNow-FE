import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" }) // Ensures the field is not empty
    .email(), // Ensures proper email format
  password: z.string(),
  // .min(6, { message: "Password must be at least 6 characters" }),
});
