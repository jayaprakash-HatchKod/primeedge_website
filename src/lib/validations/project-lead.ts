import { z } from "zod";

export const projectLeadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  college: z.string().trim().max(140).optional().or(z.literal("")),
  branch: z.string().trim().max(80).optional().or(z.literal("")),
  projectId: z.string().trim().min(1, "Select a project"),
});

export type ProjectLeadInput = z.infer<typeof projectLeadSchema>;
