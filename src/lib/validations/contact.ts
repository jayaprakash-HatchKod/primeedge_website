import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  message: z.string().trim().min(10, "Tell us a bit more (min 10 characters)").max(1000),
});

export type ContactInput = z.infer<typeof contactSchema>;
