import { z } from "zod";

export const enrollmentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(100, "Name is too long"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  city: z.string().trim().min(2, "Enter your city").max(80, "City name is too long"),
  university: z.string().trim().min(2, "Enter your university").max(140, "University name is too long"),
  college: z.string().trim().min(2, "Enter your college").max(140, "College name is too long"),
  branch: z.string().trim().min(2, "Enter your branch").max(100, "Branch name is too long"),
  qualification: z.string().trim().max(120).optional().or(z.literal("")),
  courseId: z.string().min(1, "Course is required"),
});

export type EnrollmentInput = z.infer<typeof enrollmentSchema>;
