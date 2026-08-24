import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().trim().min(3, "Title is too short").max(140),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  description: z.string().trim().min(20, "Add a longer description"),
  highlights: z.array(z.string().trim().min(1)).max(10).default([]),
  duration: z.string().trim().min(2, "Duration is required"),
  price: z.coerce.number().int().min(0, "Price cannot be negative"),
  thumbnail: z.string().trim().url().optional().or(z.literal("")),
  demoVideo1: z.string().trim().url().optional().or(z.literal("")),
  demoVideo2: z.string().trim().url().optional().or(z.literal("")),
  syllabusPdf: z.string().trim().url().optional().or(z.literal("")),
  trainerName: z.string().trim().max(120).optional().or(z.literal("")),
  trainerBio: z.string().trim().max(600).optional().or(z.literal("")),
  trainerAvatar: z.string().trim().url().optional().or(z.literal("")),
  isActive: z.coerce.boolean().default(true),
});

export type CourseInput = z.infer<typeof courseSchema>;
