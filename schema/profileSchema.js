import * as z from "zod";

export const ProfileSchema = z.object({
  age: z
    .string()
    .transform(Number)
    .refine((age) => Number.isInteger(age) && age >= 13, {
      message: "Age must be a whole number and at least 13 years old",
    }),
  height: z
    .string()
    .transform(Number)
    .refine(
      (h) => h >= 50 && h <= 250 && /^\d+(\.\d{1})?$/.test(h.toString()),
      {
        message:
          "Height must be between 50 cm and 250 cm with at most one decimal place",
      }
    ),
  weight: z
    .string()
    .transform(Number)
    .refine(
      (w) => w >= 30 && w <= 300 && /^\d+(\.\d{1})?$/.test(w.toString()),
      {
        message:
          "Weight must be between 30 kg and 300 kg with at most one decimal place",
      }
    ),
  gender: z.enum(["Male", "Female"]),
  activityLevel: z.enum([
    "Sedentary",
    "Light",
    "Moderate",
    "Active",
    "Very Active",
  ]),
  fitnessGoal: z.enum(["Lose Weight", "Gain Muscle", "Stay Fit"]),
});
